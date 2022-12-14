import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { BsWallet2 } from "react-icons/bs";

export default function Header() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const [userName, setUserName] = useState("");
  const { disconnect } = useDisconnect();
  if (isConnected) {
    return (
      <div className=" bg-white shadow p-4">
        <div className="flex flex-row items-center justify-between container mx-auto">
          <div id="logo" className="text-2xl text-blue-500 font-bold ">
            DAgree
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
              onClick={disconnect}
            >
              <span className="mr-2">
                {address.slice(0, 4) + "..." + address.slice(10, 15)}
              </span>
              <BsWallet2 />
            </button>
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
            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {" "}
              <span className="mr-2">Connect</span>
              <BsWallet2 />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
