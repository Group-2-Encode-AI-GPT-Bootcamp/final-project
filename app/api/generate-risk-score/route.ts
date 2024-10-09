import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import puppeteer, { Page } from 'puppeteer';

interface TwitterProfile {
  handle: string;
  userDescription: string;
  createdAt: string;
  followers: number;
  following: number;
  verified: boolean;
  locked: boolean;
  website: string;
  recentTweets: { text: string }[];
}


export async function POST(request: Request) {
  const { twitterHandle } = await request.json();

  if (!twitterHandle) {
    return NextResponse.json({ error: 'Twitter handle is required' }, { status: 400 });
  }

  try {
    // Fetch Twitter profile data
    const twitterProfile = await fetchTwitterProfile(twitterHandle);
    console.log('Twitter Profile:', JSON.stringify(twitterProfile, null, 2));

    // Check if the account is locked
    if (twitterProfile.locked) {
      return NextResponse.json({ error: 'Unable to verify the account as the account is locked' }, { status: 403 });
    }

    // Generate analysis prompt
    const prompt = generateAnalysisPrompt(twitterProfile);
    console.log('Generated Analysis Prompt:', prompt);

    // Call OpenAI API for analysis
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      system: "You are an AI assistant that analyzes Twitter profiles for Web3 project risk assessment. Your output for the reasoning will always be in markdown.",
      prompt: prompt,
    });

    console.log('result by openAI:', text);

    // Parse the analysis to extract scores and overall risk score
    const medianScore = getMedian(text);

    // Return the analysis result and overall risk score
    return NextResponse.json({ result: text, riskScore: medianScore });
  } catch (error) {
    console.error('Error generating risk score:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

async function fetchTwitterProfile(handle: string) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://twitter.com/${handle}`, { waitUntil: 'networkidle0' });

    // Scroll down to load more tweets
    await autoScroll(page);


    const profileData = await page.evaluate(() => {
      const followingElement = document.querySelector('a[href$="/following"] span');
      const userDescriptionElement = document.querySelector('div[data-testid="UserDescription"]');
      const followersElement = document.querySelector('a[href$="/verified_followers"] span');
      const joinDateElement = document.querySelector('span[data-testid="UserJoinDate"]');
      const verifiedElement = document.querySelector('svg[aria-label="Verified account"]');
      const lockedElement = document.querySelector('svg[aria-label="Protected account"]');
      const websiteElement = document.querySelector('a[data-testid="UserUrl"] span');

      // Updated tweet extraction
      const tweetElements = document.querySelectorAll('div[data-testid="tweetText"]');

      const tweets = Array.from(tweetElements)
        .map(tweet => ({
          text: tweet.textContent?.replace(/\n/g, ' ').trim() ?? ''
        }))
        .filter(tweet => tweet.text !== ''); // Filter out any empty tweets

      console.log(tweets);



      return {
        userDescription: userDescriptionElement
          ? Array.from(userDescriptionElement.childNodes)
            .map(node => node.textContent?.trim() ?? '')
            .filter(text => text !== '')
            .join(' ')
          : '',
        following: followingElement?.textContent?.trim() ?? '0',
        followers: followersElement?.textContent?.trim() ?? '0',
        joinDate: joinDateElement?.textContent?.trim() ?? '',
        verified: !!verifiedElement,
        locked: !!lockedElement,
        website: websiteElement?.textContent?.trim() ?? '',
        recentTweets: tweets,
      };
    });

    await browser.close();

    const cleanedTweets = profileData.recentTweets.map(tweet => ({
      text: cleanTweetText(tweet.text)
    })).filter(tweet => tweet.text !== '');

    return {
      handle,
      userDescription: profileData.userDescription,
      createdAt: profileData.joinDate,
      followers: parseTwitterNumber(profileData.followers),
      following: parseTwitterNumber(profileData.following),
      verified: profileData.verified,
      locked: profileData.locked,
      website: profileData.website,
      recentTweets: cleanedTweets,
    };
  } catch (error) {
    console.error('Error fetching Twitter profile:', error);
    throw new Error('Failed to fetch Twitter profile');
  }
}

async function autoScroll(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const startTime = Date.now(); // Track the start time
      const duration = 15000; // Minimum 10 seconds (in ms)
      let totalHeight = 0;
      const distance = 1000; // Scroll 100px on each step

      const timer = setInterval(() => {
        const now = Date.now();
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Stop scrolling if we've reached the end of the page or if 10 seconds have passed
        if (
          totalHeight >= scrollHeight - window.innerHeight ||  // Scroll till the bottom of the page
          now - startTime >= duration                          // Ensure 10 seconds duration
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 100); // Scroll every 100 milliseconds for stability
    });
  });
}


function cleanTweetText(text: string): string {
  let cleaned = text.replace(/^.*?·.*?(\n|$)/, '');
  cleaned = cleaned.replace(/Show more$/, '');
  return cleaned.trim();
}

function parseTwitterNumber(str: string): number {
  const multipliers: { [key: string]: number } = { K: 1000, M: 1000000, B: 1000000000 };
  const match = str.match(/^(\d+(?:\.\d+)?)\s*([KMB])?$/);
  if (match) {
    const [, num, unit] = match;
    return Math.round(parseFloat(num) * (unit ? multipliers[unit] : 1));
  }
  return 0;
}


function generateAnalysisPrompt(profile: TwitterProfile) {
  return `
Analyze the following Twitter profile for a Web3 project risk assessment:

Twitter Handle: ${profile.handle}
User Description: ${profile.userDescription}
Account Created: ${profile.createdAt}
Website: ${profile.website}
Followers: ${profile.followers}
Following: ${profile.following}
Verified: ${profile.verified}

Recent Tweets:
${profile.recentTweets.map((tweet, index) => `${index + 1}. ${tweet.text}`).join('\n')}

Please provide a score from 1 to 10 for each of the following criteria, where 0 is the lowest (highest risk) and 10 is the highest (lowest risk):

1. Account Longevity: Established accounts (>6 months) indicate more stability
2. Follower Base: A substantial following (>10,000) suggests broader recognition
3. Verified Status: Official verification adds credibility to the project
4. Community Engagement: High interaction rates show an active, interested audience
5. Content Value: Informative, well-crafted tweets demonstrate expertise
6. Posting Consistency: Regular updates indicate ongoing project development
7. Responsive Communication: Timely replies to community queries show dedication
8. Transparent Resources: Easy access to official website and documentation
9. Team Visibility: Clear information about team members builds trust
10. Industry Connections: Interactions with reputable projects suggest legitimacy

Provide your scores and reasoning for each criterion. Make sure your output is in markdown style.
`;
}

function getMedian(analysis: string | null): number {
  if (!analysis) return 0;

  const scores: number[] = [];
  const lines = analysis.split('\n');

  for (const line of lines) {
    if (line.includes('Score:')) {
      const scoreMatch = line.match(/Score:\s*(\d+)/);
      if (scoreMatch) {
        const score = parseInt(scoreMatch[1], 10);
        scores.push(score);
      }
    }
  }

  return calculateMedian(scores);
}

// Helper function to calculate the median
function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}