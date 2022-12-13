import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function Header() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <div className=" bg-white shadow p-4">
        <div className="flex flex-row items-center justify-between container mx-auto">
          <div id="logo" className="text-2xl text-blue-500 font-bold">
            DAgree
          </div>
          <div>
            <div className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer">
              Connected
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          {connectors.map((connector) => (
            <div
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              Connect
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
