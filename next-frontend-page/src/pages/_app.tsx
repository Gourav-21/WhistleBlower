import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <RecoilRoot>
      <Component {...pageProps} />
      <Toaster />
      <SpeedInsights/>
    </RecoilRoot>
  </>
}
