"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function HeaderComponent() {
  const pathname = usePathname();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <ShieldCheck className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">Web3 Risk Score</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {pathname === "/" && (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#how-it-works"
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#features"
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#get-started"
            >
              Get Started
            </Link>
          </>
        )}
        {pathname !== "/privacy" && pathname !== "/" && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/privacy"
          >
            Privacy
          </Link>
        )}
        {pathname !== "/privacy" && pathname !== "/" && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/terms-of-service"
          >
            Terms of Service
          </Link>
        )}
      </nav>
    </header>
  );
}
