import { Inter } from "next/font/google";
import ConnectWallet from "@/components/ConnectWallet";
import { useRouter } from "next/router";
import { EvervaultCard } from "@/components/ui/evervault-card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <div className="w-full h-full absolute ">
      <EvervaultCard className="z-0" text="WhitleBlower">
        <div className="flex flex-col items-center justify-center text-center h-full gap-2 z-20">
          <h1 className="section-header-headline dark:text- mt-10 text-8xl text-black z-20">WhitleBlower</h1>
          <p className="p-10 text-gray-700 text-base select-none z-20">🕵️‍♂️ WhistleBlower is a platform for whistleblowers to report misconduct in a secure and private manner.</p>

          <ConnectWallet />
        </div>
      </EvervaultCard>
    </div>
  );
}


