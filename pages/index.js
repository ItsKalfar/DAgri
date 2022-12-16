import React, { useContext, useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import { ProjectContext } from "../context/ProjectContext";

import FarmerInterFace from "../components/FarmerInterFace";
import DistributerInterFace from "../components/DistributerInterFace";
import RetailerInterFace from "../components/RetailerInterFace";
import ConsumerInterFace from "../components/ConsumerInterFace";
import SignInPage from "../components/SignInPage";
import ConnectBtn from "../components/ConnectBtn";
import Image from "next/image";
import KhabyImage from "../assets/KhabyLameConnect.png";

export default function Home() {
  const { userProfession, currentAccount, isSingedIn } =
    useContext(ProjectContext);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div id="index">
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
            <Image src={KhabyImage} width={200} />
            <ConnectBtn />
          </div>
        )}
      </div>
    </>
  );
}
