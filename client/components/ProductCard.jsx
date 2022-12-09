import React from "react";

export default function ProductCard() {
  return (
    <div className="rounded overflow-hidden shadow-md bg-white my-2 relative">
      <div className="w-full px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="mb-4">
            <h1 className="font-bold text-lg">Product Name</h1>
            <h2 className="font-semibold text-gray-400">TokenId</h2>
          </div>
          <div className="font-semibold text-gray-400 absolute top-6 right-8">
            <p>Seller address</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-400">Quantity</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">Price</p>
          <button className=" text-red-600 active:bg-red-900 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg border-2 border-red-600 hover:bg-red-600 hover:text-white">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
