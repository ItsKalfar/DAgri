import React, { useEffect, useState, createContext } from "react";
import ContractABI from "../constants/ContractABI.json";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";
import { useRouter } from "next/router";

export const DAgriContext = createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

// To connect to the smart contract we need 3 things
// Provider / Connection to the blockchain
// Signer / Wallet
// contract that we are interacting with - ABI & Address

export const DAgreeProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const abi = ContractABI.abi;
  const auth = getAuth(app);
  const router = useRouter();

  const createAccount = (name, email, pass) => {
    if (!name || !email || !pass) {
      alert("Please provide info...");
    }
    // Creating a account of a user
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayname: name,
        });
        router.push("/logIn");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            alert("Please provide valid email address");
            break;
          case "auth/weak-password":
            alert("Please put a strong password");
            break;
          case "auth/email-already-in-use":
            alert("User already exist");
            break;
          default:
            alert(err.message);
            break;
        }
      });
  };

  const signInUser = (email, pass, prof) => {
    if (!email || !pass || !prof) {
      alert("Please provide info...");
    }

    // sign in into the account
    signInWithEmailAndPassword(auth, email, pass)
      .then(async (res) => {
        switch (prof) {
          case "farmer":
            router.push("/farmer");
            break;
          case "distributer":
            router.push("/distributer");
            break;
          case "retailer":
            router.push("/retailer");
            break;
          case "consumer":
            router.push("/consumer");
        }
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/wrong-password":
            alert("Oops! Wrong password...");
            break;
          case "auth/user-not-found":
            alert("Oops! You don't have an account yet...");
            break;
          default:
            alert(err.code);
        }
      });
  };

  // * Checks if MetaMask is installed and an account is connected

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask ");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask first!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(currentAccount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <DAgriContext.Provider
      value={{
        currentAccount,
        connectWallet,
        createAccount,
        signInUser,
      }}
    >
      {children}
    </DAgriContext.Provider>
  );
};
