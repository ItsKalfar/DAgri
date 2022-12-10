import React from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

import { BsWallet2 } from "react-icons/bs";

export default function FarmerHeader() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, isLoading } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <nav className=" bg-white shadow p-4">
        <div className="flex flex-row items-center justify-between container mx-auto">
          <div id="logo" className="text-2xl text-blue-500 font-bold">
            DAgree
          </div>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase"
            onClick={disconnect}
          >
            {address.slice(0, 8)}...
            {address.slice(8, 15)}
          </button>
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
        {connectors.map((connector) => (
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between"
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            {isLoading ? (
              <div>
                <BsWallet2 />
                <span className="ml-2">connect</span>
              </div>
            ) : (
              <span>Connecting...</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
