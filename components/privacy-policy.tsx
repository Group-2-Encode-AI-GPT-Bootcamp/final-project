import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import { FooterComponent } from "./footer"

export function PrivacyPolicyComponent() {
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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/terms-of-service">
            Terms of Service
          </Link>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, use our services,
              or communicate with us. This may include your name, email address, and any other information you choose to
              provide.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to develop new services,
              and to protect our company and our users.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Information Sharing and Disclosure</h2>
            <p>
              We do not share your personal information with companies, organizations, or individuals outside of Web3
              Risk Score unless one of the following circumstances applies:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>With your consent</li>
              <li>For legal reasons</li>
              <li>To protect the rights, property, or safety of Web3 Risk Score, our users, or the public</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and
              unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information. You can do this by contacting
              us directly.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new
              privacy policy on this page.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at [Your Contact Information].
            </p>
          </section>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <FooterComponent />
    </div>
  )
}