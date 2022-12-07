import React, { useState, useContext, useEffect, createContext } from "react";

export const UserContext = createContext();

const [isInstalled, setIsInstalled] = useState(true);

let eth;
if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const checkInstalation = async(metamask = eth){
    try{
        if(!metamask){
            setIsInstalled(false);
        }
        else{
            setIsInstalled(true);
        }

    }
    catch(error){
        return error;
    }
}