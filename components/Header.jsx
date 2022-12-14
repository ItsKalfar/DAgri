import React, { useContext, useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { ProjectContext } from "../context/ProjectContext";

export default function Header() {
  const { connectWallet, currentAccount } = useContext(ProjectContext);

  return (
    <div className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          {currentAccount ? (
            <div className="flex items-center justify-between">
              <button className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold mr-2">
                <span className="mr-2">Connected</span>
                <BsWallet2 />
              </button>
              <button className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold ml-2">
                <span className="mr-2">sell</span>
                <MdOutlineSell />
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
              onClick={() => connectWallet()}
            >
              <span className="mr-2">Connect</span>
              <BsWallet2 />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
