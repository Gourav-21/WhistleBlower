import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhistleBlower",
  description: "🕵️‍♂️ WhistleBlower is a platform for whistleblowers to report misconduct in a secure and private manner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RecoilRoot>
        <Toaster />
        <SpeedInsights />
        <body className={inter.className}>{children}</body>
      </RecoilRoot>
    </html>
  );
}
