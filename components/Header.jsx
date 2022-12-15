import React, { useContext, useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { MdOutlineSell, MdClose } from "react-icons/md";

import Modal from "react-modal";
import ConnectBtn from "./ConnectBtn";

export default function Header() {
  return (
    <div className=" bg-white shadow p-4">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          <ConnectBtn />
        </div>
      </div>
    </div>
  );
}
