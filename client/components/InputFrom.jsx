import React from "react";

export default function InputFrom() {
  return (
    <form className="bg-white w-2/5 mr-2 mt-2 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700  font-bold mb-2"
          for="productName"
        >
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Please enter product name..."
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700  font-bold mb-2"
          for="productQuantity"
        >
          Product Quantity
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Please enter product quantity in Kg..."
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700  font-bold mb-2"
          for="productPrice"
        >
          Product price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Please enter product price in ETH..."
        />
      </div>
      <div className="flex w-full items-end justify-end mt-8">
        <button className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase">
          Sell
        </button>
      </div>
    </form>
  );
}
