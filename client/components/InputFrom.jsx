import React, { useState, useContext, useEffect } from "react";
import { DAgriContext } from "../context/DAgriContext";
import { MdSell } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

export default function InputFrom() {
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [values, setValues] = useState({
    name: "",
    quantity: 0,
    price: 0.0,
    category: "",
  });

  const listProduct = async (name, quantity, price, category, e) => {
    e.preventDefault();
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const SupplyChain = new ethers.Contract(contractAddress, ABI, signer);
          if (
            !values.name ||
            !values.quantity ||
            !values.price ||
            !values.category
          ) {
            alert("Please fill all the fields");
          }

          let listTheItem = await SupplyChain.listItem(
            name,
            quantity,
            price,
            category
          );
          toast.loading("Listing Your Item...", { duration: 4000 });
          SupplyChain.on("ItemListed", () => {
            toast.success("Item Listed Successfully");
          });
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // const sellProduct = async () => {
  //   try {
  //     await listProduct(
  //       values.name,
  //       values.quantity,
  //       values.price,
  //       values.category
  //     );
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  return (
    <>
      <div className="flex flex-col-reverse w-2/5 mt-2 items-center">
        <div className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center w-1/3 mt-8 cursor-pointer">
          <div className="mr-1">
            <AiOutlineUnorderedList />
          </div>
          <span className="ml-1">My listing</span>
        </div>
        <div className="bg-white px-6 py-8 rounded shadow-md text-blac w-full mt-2">
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
              onChange={(e) =>
                setValues((prev) => ({ ...prev, quantity: e.target.value }))
              }
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
              onChange={(e) =>
                setValues((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Select Category
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(e) =>
                setValues((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option defaultValue="others">Product Category...</option>
              <option value="Vegetables">Vegetables</option>
              <option value="pulses">Pulses</option>
              <option value="nuts">Nuts</option>
              <option value="spices">Spices</option>
              <option value="fruits">Fruits</option>
            </select>
          </div>
          <div
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center w-full mt-8 cursor-pointer"
            onClick={listProduct}
          >
            <div className="mr-1">
              <MdSell />
            </div>
            <span className="ml-1">sell</span>
          </div>
        </div>
      </div>
    </>
  );
}
