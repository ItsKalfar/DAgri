import React from "react";

export default function FarmerHeader() {
  return (
    <div className=" bg-white shadow p-4">
      <nav className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase"
          type="button"
        >
          Connect
        </button>
      </nav>
    </div>
  );
}
