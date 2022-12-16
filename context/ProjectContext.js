import React, { useState, createContext, useEffect } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
export const ProjectContext = createContext();
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { BsConeStriped } from "react-icons/bs";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const ProjectContextProvider = ({ children }) => {
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isSingedIn, setIsSignedIn] = useState(false);
  const [userProfession, setUserProfession] = useState();
  const dbRef = collection(db, "users");

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
      checkUser();

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
        checkUser();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInUser = async (name, location, profession, walletAddress) => {
    try {
      if (!name || !location || !profession) {
        toast.error("Please Provide All The Details");
      }
      await addDoc(collection(db, "users"), {
        UserName: name,
        userLocation: location,
        userProf: profession,
        userAddress: walletAddress,
      });
      setIsSignedIn(true);
      setUserProfession(profession);
      toast.success("Singned In!!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const checkUser = async () => {
    try {
      if (typeof currentAccount !== "undefined") {
        const response = await getDocs(
          query(
            collection(db, "users"),
            where("userAddress", "==", currentAccount)
          )
        );
        response.forEach((user) => {
          setIsSignedIn(true);
          setUserProfession(user.data().userProf);
        });
      }
    } catch (error) {
      console.log(error.message);
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

          // let ethersToWei = ethers.utils.parseUnits(price.toString(), "ether");

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
          await provider.send("eth_requestAccounts", []);
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
      console.log(error.message);
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
    if (currentAccount) {
      getAllProducts();
    }
    checkUser();
    console.log(currentAccount);
    console.log("fired");
  }, [currentAccount]);

  return (
    <ProjectContext.Provider
      value={{
        isSingedIn,
        userProfession,
        connectWallet,
        currentAccount,
        signInUser,
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
