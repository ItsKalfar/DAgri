import React from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { IoWalletSharp } from "react-icons/io";

export default function DisconnectBtn() {
  const { disconnect } = useDisconnect();
  return (
    <div>
      <div
        className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer"
        onClick={disconnect}
      >
        <span className="ml-2">Connected</span>
      </div>
    </div>
  );
}
