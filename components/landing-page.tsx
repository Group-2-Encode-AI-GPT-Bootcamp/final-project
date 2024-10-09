import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FooterComponent } from "./footer";
import { HeaderComponent } from "./header";

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto max-w-[1200px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI Web3 Risk Score Generator
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our AI quickly assess potential red flags in Web3 projects using
                  their Twitter handles. Our 10-point system provides a
                  comprehensive risk score to help you make informed decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/dashboard"
                >
                  <Button>Get Started</Button>
                </Link>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-[1200px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our 10-Point Scoring System
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              We analyze various aspects of a project&apos;s Twitter presence to provide a comprehensive risk assessment. Here&apos;s what we look for:
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { title: "Account Longevity", description: "Established accounts (>6 months) indicate more stability" },
                { title: "Follower Base", description: "A substantial following (>10,000) suggests broader recognition" },
                { title: "Verified Status", description: "Official verification adds credibility to the project" },
                { title: "Community Engagement", description: "High interaction rates show an active, interested audience" },
                { title: "Content Value", description: "Informative, well-crafted tweets demonstrate expertise" },
                { title: "Posting Consistency", description: "Regular updates indicate ongoing project development" },
                { title: "Responsive Communication", description: "Timely replies to community queries show dedication" },
                { title: "Transparent Resources", description: "Easy access to official website and documentation" },
                { title: "Team Visibility", description: "Clear information about team members builds trust" },
                { title: "Industry Connections", description: "Interactions with reputable projects suggest legitimacy" },
              ].map((point, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {point.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{point.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-[1200px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Choose Our Risk Score Generator?
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Our AI-powered tool offers unique advantages to help you navigate the complex world of Web3 projects:
            </p>
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "Lightning-Fast Assessment",
                  description: "Get a comprehensive risk score in seconds using just a Twitter handle. Save time and make informed decisions quickly.",
                  icon: "⚡️",
                },
                {
                  title: "Data-Driven Insights",
                  description: "Our advanced AI analyzes multiple factors to provide an objective, unbiased risk assessment you can trust.",
                  icon: "📊",
                },
                {
                  title: "Stay Ahead of the Curve",
                  description: "Make smarter decisions in the fast-paced world of Web3 projects. Identify potential risks before they become problems.",
                  icon: "🚀",
                },
              ].map((feature, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          id="get-started"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-[1200px]">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Assess Your Next Web3 Project?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start using our Web3 Risk Score Generator today and make
                  informed decisions in the crypto space.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link
                  href="/dashboard"
                >
                  <Button className="w-full">Try It Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
}
