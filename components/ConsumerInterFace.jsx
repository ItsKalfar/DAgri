import React, { useContext } from "react";
import UserDetails from "./UserDetails";
import { Oval } from "react-loader-spinner";
import { ProjectContext } from "../context/ProjectContext";
import Header from "../components/Header";

export default function ConsumerInterFace() {
  const { currentAccount, isLoading } = useContext(ProjectContext);
  return (
    <div className="h-full">
      <Header />
      <div>
        {currentAccount ? (
          isLoading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <Oval
                height={40}
                width={40}
                color="blue"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={4}
                strokeWidthSecondary={4}
              />
            </div>
          ) : (
            <div className="container mx-auto py-8 flex items-center justify-center w-full">
              <UserDetails />
            </div>
          )
        ) : (
          <div className="container mx-auto p-8 flex item-center justify-center">
            <h1>Please Connect your wallet first</h1>
          </div>
        )}
      </div>
    </div>
  );
}
