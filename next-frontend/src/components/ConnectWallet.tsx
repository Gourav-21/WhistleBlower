import React, { useState } from "react";
import { constSelector, useSetRecoilState } from "recoil";
import { SecretNetworkClient } from "secretjs";
import { secret } from "../store/secret";
import { useRouter } from "next/router";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
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
          router.push('/post')
      } catch (error) {
        console.error("Error connecting to kelpr", error);
      }
    } else {
      alert("Please install keplr!");
    }
  };

  return (
    <div className="connect-wallet">
      <button onClick={connectWalletHandler}>
        {isConnected ? "Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default ConnectWallet;
