'use client'
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Wrapper({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <RecoilRoot>
                <Toaster />
                <SpeedInsights />
                {children}
            </RecoilRoot>
        </>
    )
}