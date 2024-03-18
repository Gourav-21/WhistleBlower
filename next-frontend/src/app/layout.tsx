import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "./wrapper";

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
        <body className={inter.className}>
        <link rel="icon" href="/whitsle.svg" sizes="any" />
          <Wrapper>
          {children}
          </Wrapper>
        </body>
    </html>
  );
}
