import InputFrom from "../components/InputFrom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

import React from "react";

export default function farmer() {
  return (
    <div className="bg-slate-50 h-100">
      <Header />
      <div className="container mx-auto flex items-start justify-between mt-4">
        <InputFrom />
        <div className="flex flex-col w-3/5 ml-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
