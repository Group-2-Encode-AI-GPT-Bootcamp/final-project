import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const { twitterHandle, apiKey } = await request.json();

  if (!twitterHandle) {
    return NextResponse.json({ error: 'Twitter handle is required' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key is required' }, { status: 400 });
  }

  // Initialize OpenAI client with the provided API key
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  try {
    // Fetch Twitter profile data (mock implementation)
    const twitterProfile = await fetchTwitterProfile(twitterHandle);

    // Generate analysis prompt
    const prompt = generateAnalysisPrompt(twitterProfile);

    // Call OpenAI API for analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI assistant that analyzes Twitter profiles for Web3 project risk assessment." },
        { role: "user", content: prompt }
      ],
    });

    const analysis = completion.choices[0].message.content;

    // Parse the analysis to extract scores
    const scores = parseAnalysis(analysis);

    // Calculate overall risk score
    const overallScore = calculateOverallScore(scores);

    return NextResponse.json({ riskScore: overallScore, detailedScores: scores });
  } catch (error) {
    console.error('Error generating risk score:', error);
    return NextResponse.json({ error: 'Failed to generate risk score' }, { status: 500 });
  }
}

async function fetchTwitterProfile(handle: string) {
  // Mock implementation - replace with actual Twitter API call
  return {
    handle,
    createdAt: '2020-01-01',
    followers: 15000,
    verified: true,
    tweetCount: 1000,
    // Add more fields as needed
  };
}

function generateAnalysisPrompt(profile: any) {
  return `
Analyze the following Twitter profile for a Web3 project risk assessment:

Twitter Handle: ${profile.handle}
Account Created: ${profile.createdAt}
Followers: ${profile.followers}
Verified: ${profile.verified}
Tweet Count: ${profile.tweetCount}

Please provide a score from 1 to 10 for each of the following criteria, where 1 is the lowest (highest risk) and 10 is the highest (lowest risk):

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

Provide your scores in the following format:
1. Account Longevity: [SCORE]
2. Follower Base: [SCORE]
...
10. Industry Connections: [SCORE]

Follow each score with a brief explanation of your reasoning.
`;
}

function parseAnalysis(analysis: string | null): Record<string, number> {
  if (!analysis) return {};

  const scores: Record<string, number> = {};
  const lines = analysis.split('\n');

  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s+(.+):\s+(\d+)/);
    if (match) {
      const [, , category, score] = match;
      scores[category] = parseInt(score, 10);
    }
  }

  return scores;
}

function calculateOverallScore(scores: Record<string, number>): number {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const averageScore = totalScore / Object.keys(scores).length;
  return Math.round(averageScore * 10) / 10; // Round to one decimal place
}