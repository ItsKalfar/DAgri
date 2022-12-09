import React, { useEffect, useState, createContext } from "react";

export const DAgriContext = createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const DAgreeProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // * Checks if MetaMask is installed and an account is connected

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask ");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
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
      }}
    >
      {children}
    </DAgriContext.Provider>
  );
};
