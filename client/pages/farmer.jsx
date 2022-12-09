import FarmerHeader from "../components/FarmerHeader";
import InputFrom from "../components/InputFrom";
import ProductList from "../components/ProductList";

import React from "react";

export default function farmer() {
  return (
    <div className="bg-slate-50 h-100">
      <FarmerHeader />
      <div className="container mx-auto flex items-start justify-between mt-4">
        <InputFrom />
        <ProductList />
      </div>
    </div>
  );
}
