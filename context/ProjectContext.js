import React, { useState, createContext, useEffect } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
export const ProjectContext = createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const ProjectContextProvider = ({ children }) => {
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [currentAccount, setCurrentAccount] = useState();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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

          if (!name || !quantity || !price || !category) {
            toast.error("Please Provide All The Details");
          }

          let listTheItem = await SupplyChain.listItem(
            name,
            quantity,
            price,
            category
          );

          toast.loading("Listing Your Item...", { duration: 6000 });
          SupplyChain.on("ItemListed", () => {
            toast.success("Item Listed Successfully");
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllProducts = async () => {
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

          setIsLoading(true);

          let tokenId = await SupplyChain.getTokenId();

          for (let index = 1; index <= tokenId; index++) {
            let getItem = await SupplyChain.getFarmersListing(index);
            if (getItem.tokenId._hex > 0) {
              setAllProducts((prev) => [getItem, ...prev]);
            }
          }

          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelProduct = async (tokenNumber) => {
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
          let cancelItem = await SupplyChain.cancelItem(tokenNumber);
          toast.loading("Canceling Item", { duration: 4000 });
          SupplyChain.on("ItemCanceled", () => toast.success("Item Canceled!"));
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProduct = async (tokenNumber, newPrice) => {
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
          let updateListing = await SupplyChain.updateListing(
            tokenNumber,
            newPrice
          );
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllProducts();
    console.log("fired");
  }, [currentAccount]);

  return (
    <ProjectContext.Provider
      value={{
        connectWallet,
        currentAccount,
        listProduct,
        getAllProducts,
        allProducts,
        isLoading,
        cancelProduct,
        updateProduct,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
