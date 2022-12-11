import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ConnectBtn from "./ConnectBtn";
import DisconnectBtn from "./DisconnectBtn";

export default function FarmerHeader() {
  const { isConnected } = useAccount();

  if (isConnected) {
    return (
      <nav className=" bg-white shadow p-4">
        <div className="flex flex-row items-center justify-between container mx-auto">
          <div id="logo" className="text-2xl text-blue-500 font-bold">
            DAgree
          </div>
          <div>
            <DisconnectBtn />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          <ConnectBtn />
        </div>
      </div>
    </nav>
  );
}
