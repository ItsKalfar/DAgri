import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { ProjectContext } from "../context/ProjectContext";

import FarmerInterFace from "../components/FarmerInterFace";
import DistributerInterFace from "../components/DistributerInterFace";
import RetailerInterFace from "../components/RetailerInterFace";
import ConsumerInterFace from "../components/ConsumerInterFace";
import SignInPage from "../components/SignInPage";
import ConnectBtn from "../components/ConnectBtn";

export default function Home() {
  const { userProfession, currentAccount, isSingedIn } =
    useContext(ProjectContext);

  return (
    <>
      <Head>
        <title>DAgri</title>
        <meta name="author" content="Sagar Gund" />
        <meta name="distribution" content="global" />
        <meta name="language" content="English" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DAgri" />
        <meta property="og:site_name" content="DAgri" />
        <meta property="og:url" content="https://d-agri-frontend.vercel.app/" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      <div id="index" className="bg-slate-50 min-h-screen">
        {currentAccount ? (
          isSingedIn ? (
            userProfession === "farmer" ? (
              <FarmerInterFace />
            ) : userProfession === "distributer" ? (
              <DistributerInterFace />
            ) : userProfession == "retailer" ? (
              <RetailerInterFace />
            ) : userProfession == "consumer" ? (
              <ConsumerInterFace />
            ) : (
              ""
            )
          ) : (
            <SignInPage />
          )
        ) : (
          <div className="container mx-auto p-8 flex flex-col items-center w-screen h-screen justify-center">
            <div className="max-w-md w-full pointer-events-auto flex flex-col items-start mx-auto p-4 text-center">
              <p className="text-xl font-medium text-gray-900 w-full">
                Welcome to DAgri!
              </p>
              <p className="mt-2 text-sm text-gray-500">
                To use DAgri, make sure you have{" "}
                <Link
                  href="https://metamask.io/"
                  target="_blank"
                  className="text-blue-600 cursor-pointer"
                >
                  Metamask
                </Link>{" "}
                installed. Make an account in Metamask Wallet. Then switch the
                network from Ethereum Mainnet to Goerli Test network. After
                that, fund that account with some test ETH using{" "}
                <Link
                  href="https://goerlifaucet.com/"
                  target="_blank"
                  className="text-blue-600 cursor-pointer"
                >
                  Goerli Faucet.
                </Link>
              </p>
              <p className="text-sm mt-4 text-gray-500 w-full">
                After that, connect the wallet using Connect button.
              </p>
            </div>
            <ConnectBtn />
          </div>
        )}
      </div>
    </>
  );
}
