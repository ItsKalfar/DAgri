import React from "react";

export default function ProductCard({
  name,
  tokenID,
  quantity,
  price,
  Category,
  Seller,
}) {
  return (
    <div className="rounded overflow-hidden shadow-md bg-white my-2 relative">
      <div className="w-full px-5 py-5">
        <div className="flex items-center justify-between">
          <div className="mb-4">
            <h1 className="font-bold text-lg">{name}</h1>
            <h2 className="font-semibold text-gray-400">{tokenID}</h2>
          </div>
          <div className="font-semibold text-gray-400 absolute top-6 right-8">
            <p>{Seller}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold text-gray-400">{quantity} Kg</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-gray-400">{Category}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">{price} ETH</p>
        </div>
      </div>
    </div>
  );
}
