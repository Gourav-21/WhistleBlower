"use client";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SecretNetworkClient } from "secretjs";
import { secret } from "../store/secret";
import { useRouter } from 'next/navigation'
import { Button } from "./ui/button";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { walletState } from "@/store/walletConnected";

declare global {
  interface Window extends KeplrWindow {}
}

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useRecoilState(walletState);
  const [userAddress, setUserAddress] = useState("");
  const router = useRouter()

  const setSecret =useSetRecoilState(secret);

  const CHAIN_ID = "pulsar-3";
  const url = "https://api.pulsar3.scrttestnet.com";

  const connectWalletHandler = async () => {
    if (window.keplr) {
      try {
            const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
          
          while (
            !window.keplr ||
            !window.getEnigmaUtils ||
            !window.getOfflineSignerOnlyAmino
          ) {
            await sleep(50);
          }
          
          await window.keplr.enable(CHAIN_ID);
          
          const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
          const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
          setUserAddress(myAddress)
          
          const secretjs = new SecretNetworkClient({
            url,
            chainId: CHAIN_ID,
            wallet: keplrOfflineSigner,
            walletAddress: myAddress,
            encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
          });
          setSecret({ 
            secretjs,
            address:myAddress
          })
          setIsConnected(true);
        } catch (error) {
          alert("Error connecting to kelpr")
          console.error("Error connecting to kelpr", error);
          setIsConnected(false);
        }
      } else {
        alert("Please install keplr!");
        setIsConnected(false);
      }
      router.push('/post')
  };

  return (
    <div className="connect-wallet">
      <Button variant="outline" className="text-black" onClick={connectWalletHandler}>
        {isConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectWallet;
