"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FooterComponent } from "./footer";

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <ShieldCheck className="h-6 w-6" />
          <span className="sr-only">Web3 Risk Score</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#get-started"
          >
            Get Started
          </Link>
        </nav>
      </header>
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
                <Button>Get Started</Button>
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
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                "Account Age: More than 6 months old",
                "Follower Count: Over 10,000 followers",
                "Verification Status: Blue checkmark",
                "Engagement Rate: Consistent likes, retweets, comments",
                "Content Quality: Informative and well-written tweets",
                "Frequency of Posts: Consistent posting schedule",
                "Community Interactions: Responds to queries",
                "Official Resources: Links to website and whitepaper",
                "Team Information: Clear info about project team",
                "Network Connections: Interacts with reputable projects",
              ].map((point, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">Point {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{point}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-[1200px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Why Use Our Risk Score Generator?
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Quick Assessment",
                  description:
                    "Get a comprehensive risk score in seconds using just a Twitter handle.",
                },
                {
                  title: "Data-Driven Insights",
                  description:
                    "Our system analyzes multiple factors to provide an objective risk assessment.",
                },
                {
                  title: "Stay Informed",
                  description:
                    "Make better decisions in the fast-paced world of Web3 projects.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
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
                <Button className="w-full">Try It Now</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent/>
    </div>
  );
}
