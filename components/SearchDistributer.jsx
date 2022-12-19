import React, { useState, useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { toast } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";

export default function SearchDistributer() {
  const { getDistributer, productDistributer } = useContext(ProjectContext);
  const [productName, setProductName] = useState("");

  const handleSearch = () => {
    getDistributer(productName);
    console.log(productDistributer);
  };

  return (
    <div className="bg-white px-12 py-16 rounded shadow-lg text-black my-8 w-96">
      <h1 className="uppercase mb-8 text-2xl text-center font-bold">
        Search Distributer
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter Address Here..."
          onChange={(e) => setProductName(e.target.value.toLowerCase())}
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold w-full disabled:bg-blue-900"
        onClick={handleSearch}
      >
        <BsSearch className="mr-1" />
        <span className="ml-1">search</span>
      </button>
    </div>
  );
}
