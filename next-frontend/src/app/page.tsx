import ConnectWallet from "@/components/ConnectWallet";
import { EvervaultCard } from "@/components/ui/evervault-card";
import Secretname from "../components/secretname";

export default function Home() {
  return (
    <div className="w-full h-full absolute ">
      <Secretname/>
      <EvervaultCard className="z-0" text="WhitleBlower">
        <div className="flex flex-col items-center justify-center text-center h-full gap-2 z-20">
          <h1 className="md:section-header-headline md:text-6xl text-5xl dark:text- mt-10  text-black z-20">WhistleBlower</h1>
          <p className="p-10 text-gray-700 md:text-base text-sm w-2/3 md:w-full  select-none z-20">🕵️‍♂️ WhistleBlower is a platform for whistleblowers to report misconduct in a secure and private manner.</p>
          <ConnectWallet />
        </div>
      </EvervaultCard>
    </div>
  );
}
