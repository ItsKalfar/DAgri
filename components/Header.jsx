import React, { useContext, useState } from "react";
import { BsWallet2 } from "react-icons/bs";
import { MdOutlineSell, MdClose } from "react-icons/md";
import { ProjectContext } from "../context/ProjectContext";
import Modal from "react-modal";
import ConnectBtn from "./ConnectBtn";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0 0 0 0",
    border: "none",
  },
};

export default function Header() {
  const { listProduct } = useContext(ProjectContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    quantity: 0,
    price: 0.0,
    category: "",
  });

  const listTheProduct = () => {
    listProduct(values.name, values.quantity, values.price, values.category);
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className=" bg-white shadow p-4">
      <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Sell">
        <div className="bg-white px-12 py-16 rounded shadow-md text-blac w-full">
          <MdClose
            onClick={() => setModalIsOpen(!modalIsOpen)}
            className="absolute top-4 right-6 cursor-pointer"
            size={24}
          />
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
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
            onClick={listTheProduct}
          >
            List
          </div>
        </div>
      </Modal>
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div id="logo" className="text-2xl text-blue-500 font-bold">
          DAgree
        </div>
        <div>
          <ConnectBtn />
        </div>
      </div>
    </div>
  );
}
