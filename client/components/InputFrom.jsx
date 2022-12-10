import React, { useState, useContext } from "react";
import { DAgriContext } from "../context/DAgriContext";
import { ethers } from "ethers";

export default function InputFrom() {
  // const { Supplychain, currentAccount } = useContext(DAgriContext);
  const [values, setValues] = useState({
    name: "",
    category: "",
  });
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const sellProduct = async () => {
    try {
      if (!values.name || !quantity || !price || !category) {
        alert("Please fill all the fields");
      }
      if (!currentAccount || typeof currentAccount == "undefined") {
        alert("connect wallet");
      }
      const product = await Supplychain.listItem(
        values.name,
        quantity,
        price,
        values.category
      );
      alert("Item listed succesfully");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="bg-white px-6 py-8 rounded shadow-md text-blac w-2/5 mt-2">
      <h1 className="uppercase mb-8 text-3xl text-center font-bold ">
        product details
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter product name..."
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Quantity
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          min="0"
          placeholder="Enter quantity in Kg..."
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          min="0"
          placeholder="Enter price..."
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Select Category
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) => setValues(() => ({ category: e.target.value }))}
        >
          <option defaultValue="">Product Category...</option>
          <option value="Vegetables">Vegetables</option>
          <option value="pulses">Pulses</option>
          <option value="nuts">Nuts</option>
          <option value="spices">Spices</option>
          <option value="fruits">Fruits</option>
        </select>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center w-full mt-8"
        onClick={sellProduct}
      >
        sell
      </button>
    </div>
  );
}
