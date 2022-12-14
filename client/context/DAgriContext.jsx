import React, { useState, createContext } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

export const DAgriContext = createContext();

export const DAgreeProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  //-----------List Product-----------------------------------------

  const getProducts = async () => {
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

          let tokenId = await SupplyChain.getTokenId();

          for (let index = 1; index <= tokenId; index++) {
            let getItem = await SupplyChain.getFarmersListing(index);
            setAllProducts((prev) => [...prev, getItem]);
            console.log("product Addedd");
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const cancelProduct = async (tokenId) => {
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

          let cancelItem = await SupplyChain.cancelItem(tokenId);

          SupplyChain.on("ItemCanceled", (productName, tokenId, seller) =>
            toast.success("Item deleted successfully!")
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <DAgriContext.Provider value={{ allProducts, getProducts, cancelProduct }}>
      {children}
    </DAgriContext.Provider>
  );
};
