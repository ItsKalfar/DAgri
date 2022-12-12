import React, { useState, createContext, useEffect } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";

export const DAgriContext = createContext();

export const DAgreeProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  //-----------List Product-----------------------------------------
  const listProduct = async (name, quantity, price, category) => {
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

          let listTheItem = await SupplyChain.listItem(
            name,
            quantity,
            price,
            category
          );
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const listItemListerner = () => {
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

          SupplyChain.on(
            "ItemListed",
            (
              productName,
              tokenId,
              productQuantity,
              productPrice,
              category,
              seller
            ) => {
              alert("Item listed successfully!");
            }
          );
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <DAgriContext.Provider value={{ listProduct, listItemListerner }}>
      {children}
    </DAgriContext.Provider>
  );
};
