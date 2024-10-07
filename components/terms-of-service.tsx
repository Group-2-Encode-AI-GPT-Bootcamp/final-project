'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import { FooterComponent } from "./footer"

export function TermsOfServiceComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">Web3 Risk Score</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/privacy">
            Privacy Policy
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Web3 Risk Score Generator service, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Description of Service</h2>
            <p>
              Web3 Risk Score Generator provides a risk assessment tool for Web3 projects based on their Twitter
              profiles. Our service is for informational purposes only and should not be considered as financial advice.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
            <p>
              You are responsible for your use of the service and for any content you provide. You agree not to use the
              service for any unlawful purpose or in any way that could damage or impair the service.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p>
              All content and functionality on the Web3 Risk Score Generator service is the property of our company and
              is protected by international copyright laws.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p>
              We strive to provide accurate information, but we make no warranties about the completeness, reliability,
              or accuracy of this information. Any action you take based on the information provided by our service is
              strictly at your own risk.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will always post the most current version on
              our website. By continuing to use the service after changes have been made, you agree to be bound by the
              revised terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction],
              without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <FooterComponent/>
    </div>
  )
}