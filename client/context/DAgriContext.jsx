import React, { useEffect, useState, createContext } from "react";

export const DAgriContext = createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const DAgreeProvider = ({ children }) => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [currentAccount, setCurrentAccount] = useState();
  const [isConnected, setIsConeected] = useState(false);

  // * Checks if MetaMask is installed
  const isMetamskInstalled = async (metamask = eth) => {
    if (!metamask) {
      setIsInstalled(false);
    } else {
      setIsInstalled(true);
    }
  };

  // * Checks if MetaMask is installed and an account is connected

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (isInstalled) setIsInstalled(false);
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
      setIsConeected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async (metamask = eth) => {
    try {
      if (isInstalled) {
        console.log("is installed");
        const accounts = await metamask.request({
          method: "eth_requestAccounts",
        });
        setIsConeected(true);
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isMetamskInstalled();
    checkIfWalletIsConnected();
  });

  return (
    <DAgriContext.Provider
      value={{
        currentAccount,
        connectWallet,
        isInstalled,
        isConnected,
        checkIfWalletIsConnected,
      }}
    >
      {children}
    </DAgriContext.Provider>
  );
};
