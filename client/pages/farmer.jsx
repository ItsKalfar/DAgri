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
