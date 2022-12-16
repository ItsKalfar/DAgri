import React, { useContext, useState } from "react";
import ConnectBtn from "./ConnectBtn";
import { ProjectContext } from "../context/ProjectContext";

export default function Header() {
  const { currentAccount } = useContext(ProjectContext);
  return (
    <div className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>{currentAccount ? <ConnectBtn /> : <div></div>}</div>
      </div>
    </div>
  );
}
