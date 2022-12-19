import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
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
            <ConnectBtn />
          </div>
        )}
      </div>
    </>
  );
}
