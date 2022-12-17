import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { ProjectContext } from "../context/ProjectContext";
import { MdClose, MdOutlineTrackChanges, MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "0 0 0 0",
  },
};

export default function TrackBtn() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tokenId, setTokenId] = useState();
  const { getOwners, allOwners } = useContext(ProjectContext);

  const handleTracking = () => {
    getOwners(tokenId);
  };

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="bg-white px-12 py-14 rounded shadow-md border-gray-200 border-2 text-blac w-full flex flex-col items-center text-black justify-center">
          <div className="flex flex-col items-start mb-2 w-full">
            <MdClose
              onClick={() => setModalIsOpen(!modalIsOpen)}
              className="absolute top-4 right-6 cursor-pointer"
              size={24}
            />

            <h1 className="uppercase mb-8 text-3xl text-center font-bold ">
              Get product details
            </h1>
            <div className="mb-4 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Product ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min="0"
                placeholder="Enter Token Id..."
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>

            <div>
              {typeof allOwners.farmerAddress !== "undefined" ||
              typeof allOwners.distributerAddress !== "undefined" ||
              typeof allOwners.retailerAddress !== "undefined" ? (
                <div>
                  <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
                    Farmer Address :{" "}
                    <div
                      className=" my-2 py-1 px-4 bg-gray-200 rounded-full text-gray-500 flex items-center cursor-copy"
                      onClick={() => toast.success("Copied to Clipboard")}
                    >
                      <MdContentCopy className="mr-1" />
                      <CopyToClipboard text={allOwners.farmerAddress}>
                        <span>{allOwners.farmerAddress}</span>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
                    Distributer Address :{" "}
                    <div
                      className=" my-2 py-1 px-4 bg-gray-200 rounded-full text-gray-500 flex items-center cursor-copy"
                      onClick={() => toast.success("Copied to Clipboard")}
                    >
                      <MdContentCopy className="mr-1" />
                      <CopyToClipboard text={allOwners.distributerAddress}>
                        <span>{allOwners.distributerAddress}</span>
                      </CopyToClipboard>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
                    Retailer Address :{" "}
                    <div
                      className=" my-2 py-1 px-4 bg-gray-200 rounded-full text-gray-500 flex items-center cursor-copy"
                      onClick={() => toast.success("Copied to Clipboard")}
                    >
                      <MdContentCopy className="mr-1" />
                      <CopyToClipboard text={allOwners.retailerAddress}>
                        <span>{allOwners.retailerAddress}</span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold w-full mt-4"
              onClick={handleTracking}
            >
              Track Now
              <MdOutlineTrackChanges className="ml-1" />
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
        Track
        <MdOutlineTrackChanges className="ml-1" />
      </div>
    </>
  );
}
