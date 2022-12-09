import React, { useContext, useState, useEffect } from "react";
import { DAgriContext } from "../context/DAgriContext";
import { BsWallet2 } from "react-icons/bs";

export default function FarmerHeader() {
  const { connectWallet, currentAccount } = useContext(DAgriContext);
  const [useName, setUserName] = useState("");

  useEffect(() => {
    if (currentAccount) {
      setUserName(
        `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`
      );
    }
  }, []);

  return (
    <div className=" bg-white shadow p-4">
      <nav className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        {currentAccount ? (
          <button className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase">
            {useName}
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center"
            type="button"
            onClick={() => connectWallet()}
          >
            {" "}
            <BsWallet2 />
            <span className="ml-2">Connect</span>
          </button>
        )}
      </nav>
    </div>
  );
}
