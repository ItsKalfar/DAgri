import React, { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { BsWallet2 } from "react-icons/bs";

export default function ConnectBtn() {
  const { connectWallet, currentAccount } = useContext(ProjectContext);
  return (
    <div>
      {currentAccount ? (
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline flex items-center justify-between cursor-pointer font-semibold mr-2">
            <span className="mr-2">
              {currentAccount.slice(0, 5) +
                "..." +
                currentAccount.slice(38, 42)}
            </span>
            <BsWallet2 />
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-2 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
          onClick={() => connectWallet()}
        >
          Connect
        </button>
      )}
    </div>
  );
}
