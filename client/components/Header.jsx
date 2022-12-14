import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Header() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          {connectors.map((connector) => (
            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {" "}
              {isConnected ? "Connected" : "connect"}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
