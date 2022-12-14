import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import { ProjectContext } from "../context/ProjectContext";

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

export default function ProductCard({
  name,
  tokenID,
  quantity,
  price,
  Category,
  Seller,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { cancelProduct } = useContext(ProjectContext);

  const handleCancel = () => {
    cancelProduct(tokenID);
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <MdClose
          onClick={() => setModalIsOpen(!modalIsOpen)}
          className="absolute top-4 right-6 cursor-pointer"
          size={24}
        />
        <h1>Product Details</h1>
        <p>{name}</p>
        <p>{tokenID}</p>
        <p>{Seller}</p>
        <button
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </Modal>
      <div
        className="rounded overflow-hidden shadow-md bg-white my-2 relative cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
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
    </>
  );
}
