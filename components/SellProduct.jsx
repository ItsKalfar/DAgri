import React, { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";

export default function SellProduct() {
  const { listProduct } = useContext(ProjectContext);

  const [values, setValues] = useState({
    name: "",
    quantity: 0,
    price: 0.0,
    category: "",
  });

  const listTheProduct = () => {
    let parsedPrice = parseFloat(values.price);
    console.log(values.price);
    console.log(parsedPrice);
    listProduct(values.name, values.quantity, parsedPrice, values.category);
  };
  return (
    <div>
      <div className="bg-white px-12 py-16 rounded shadow-lg text-black ">
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
            <option className="p-2.5" defaultValue="others">
              Product Category...
            </option>
            <option className="p-2.5" value="Vegetables">
              Vegetables
            </option>
            <option className="p-2.5" value="pulses">
              Pulses
            </option>
            <option className="p-2.5" value="nuts">
              Nuts
            </option>
            <option className="p-2.5" value="spices">
              Spices
            </option>
            <option className="p-2.5" value="fruits">
              Fruits
            </option>
          </select>
        </div>
        <div
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
          onClick={listTheProduct}
        >
          List
        </div>
      </div>
    </div>
  );
}
