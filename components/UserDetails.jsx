import React from "react";

export default function UserDetails() {
  return (
    <div>
      <div className="bg-white px-12 py-16 rounded shadow-lg text-black mb-8 mt-4 w-96">
        <h1 className="uppercase mb-8 text-2xl text-center font-bold">
          Wallet Address
        </h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Wallet Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter Address Here..."
          />
        </div>

        <div className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold">
          Get Details
        </div>
      </div>
    </div>
  );
}
