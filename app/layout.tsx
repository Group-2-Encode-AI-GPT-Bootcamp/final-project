import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApiKeyProvider } from "@/hooks/ApiKeyContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web3 Risk Score Generator",
  description: "An AI-powered tool that generates risk scores for Web3 projects based on their Social Media presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApiKeyProvider>
          {children}
        </ApiKeyProvider>
      </body>
    </html>
  );
}
