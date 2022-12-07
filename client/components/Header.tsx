import React from "react";

export default function Header() {
  return (
    <nav className="w-full bg-gray-800 shadow">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-6">
            <h2 className="text-2xl text-white font-bold">DAgri</h2>
          </div>
        </div>
        <div>
          <button className="relative flex w-40 justify-center rounded-3xl border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
}
