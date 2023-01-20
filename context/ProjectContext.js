import React, { useState, createContext, useEffect } from "react";
import ContractABI from "../constants/ContractABI.json";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const ABI = ContractABI.abi;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [distributerInventory, setDistributerInventory] = useState([]);
  const [productDistributer, setProductDistributer] = useState([]);
  const [allOwners, setAllOwners] = useState([]);
  const [isSingedIn, setIsSignedIn] = useState(false);
  const [userProfession, setUserProfession] = useState();
  const [stateChanged, setStateChanged] = useState(false);

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

  const signInUser = async (
    name,
    location,
    profession,
    walletAddress,
    contactNo,
    emailAddress
  ) => {
    try {
      if (!name || !location || !profession || !contactNo || !emailAddress) {
        toast.error("Please Provide All The Details");
      }
      await addDoc(collection(db, "users"), {
        UserName: name,
        userLocation: location,
        userProf: profession,
        userAddress: walletAddress,
        userContactNo: contactNo,
        userEmail: emailAddress,
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

          let listTheItem = await SupplyChain.listItem(
            name,
            quantity,
            price,
            category
          );

          toast.loading("Listing Your Item...", { duration: 6000 });
          SupplyChain.on("ItemListed", () => {
            toast.success("Item Listed Successfully");
            setStateChanged(!stateChanged);
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
          SupplyChain.on("ItemCanceled", () => {
            toast.success("Item Canceled!");
            setStateChanged(!stateChanged);
          });
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
          toast.loading("Updating Price", { duration: 4000 });
          SupplyChain.on("ItemUpdated", () => {
            toast.success("Price Update");
            setStateChanged(!stateChanged);
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDistributerInventory = async () => {
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

          for (let index = 0; index <= tokenId; index++) {
            let getItem = await SupplyChain.getDistributerInventory(index);
            if (getItem.tokenId._hex > 0) {
              setDistributerInventory((prev) => [getItem, ...prev]);
            }
          }

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const buyProduct = async (tokenNumber, price) => {
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
          let token = parseInt(tokenNumber);

          let buyItem = await SupplyChain.buyItem(token, {
            value: price,
          });
          toast.loading("Buying product...", { duration: 4000 });
          SupplyChain.on("ItemBought", () => {
            toast.success("Item Bought! Added to Your inventory");
            setStateChanged(!stateChanged);
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const purchaseProduct = async (tokenNumber, price) => {
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

          let purchaseItem = await SupplyChain.purchaseItem(tokenNumber, {
            value: price,
          });
          toast.loading("Processing Your Purchase...", { duration: 4000 });
          SupplyChain.on("ItemPurchased", () => {
            toast.success("Item Purchased!");
            setStateChanged(!stateChanged);
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getOwners = async (tokenNumber) => {
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

          let getOwners = await SupplyChain.getAllOwners(tokenNumber);
          setAllOwners(getOwners);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDistributer = async (productName) => {
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
          let getDistributerProdutcs = await SupplyChain.searchDistributer(
            productName
          );
          setProductDistributer(getDistributerProdutcs);
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
      getDistributerInventory();
    }
    checkUser();
  }, [currentAccount, stateChanged]);

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
        buyProduct,
        distributerInventory,
        productDistributer,
        getDistributer,
        purchaseProduct,
        getOwners,
        allOwners,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
