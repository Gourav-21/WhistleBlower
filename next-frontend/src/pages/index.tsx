import Image from "next/image";
import { Inter } from "next/font/google";
import ConnectWallet from "@/components/ConnectWallet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { secret } from "@/store/secret";
import Card from "@/components/Card";
import Post from "./post";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <div className="m-auto">
      
      <ConnectWallet />

    </div>
  );
}


