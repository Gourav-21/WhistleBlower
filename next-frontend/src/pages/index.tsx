import { Inter } from "next/font/google";
import ConnectWallet from "@/components/ConnectWallet";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-screen py-2 gap-20">
      {/* <DiagonalSection /> */}
      <h1 className="section-header-headline   text-8xl font-bold">WhitleBlower</h1>
      <ConnectWallet />
    </div>
  );
}



const DiagonalSection= () => {
  const diagonalSectionStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: 'black',
    clipPath: 'polygon(0 0, 100% 0, 0% 100%)',
  };

  const logoStyle: React.CSSProperties = {
    width: '80%',
    margin: '20px auto',
    display: 'block',
  };

  return (
    <div style={diagonalSectionStyle}>
      <img src="./download.png" alt="Logo" style={logoStyle} />
    </div>
  );
};
