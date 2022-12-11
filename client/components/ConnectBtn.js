import React from "react";
import { useConnect } from "wagmi";
import { IoWalletSharp } from "react-icons/io";

export default function ConnectBtn() {
  const { connect, connectors, isLoading } = useConnect();
  return (
    <div>
      {connectors.map((connector) => (
        <button
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer"
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          <span className="ml-2">Connect</span>
        </button>
      ))}
    </div>
  );
}
