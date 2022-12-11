import InputFrom from "../components/InputFrom";
import ProductCard from "../components/ProductCard";
import FarmerHeader from "../components/FarmerHeader";
import { DAgriContext } from "../context/DAgriContext";

import React, { useContext } from "react";

export default function farmer() {
  const {} = useContext(DAgriContext);
  return (
    <div className="bg-blue-50 h-screen">
      <FarmerHeader />
      <div className="container mx-auto flex items-start justify-between mt-4">
        <InputFrom />
        <div className="flex flex-col w-3/5 ml-2"></div>
      </div>
    </div>
  );
}

// {connectors.map((connector) => (
//   <button
//     className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer"
//     key={connector.id}
//     onClick={() => connect({ connector })}
//   >
//     <span className="ml-2">Connect</span>
//   </button>
// ))}
