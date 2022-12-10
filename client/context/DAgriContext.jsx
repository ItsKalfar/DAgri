import React, { useState, createContext } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";

export const DAgriContext = createContext();

export const DAgreeProvider = ({ children }) => {
  const [profession, setProffession] = useState("");
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const listProduct = async (name, quantity, price, category) => {
    try {
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
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <DAgriContext.Provider
      value={{
        listProduct,
      }}
    >
      {children}
    </DAgriContext.Provider>
  );
};
