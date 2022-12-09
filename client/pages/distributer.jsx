import React from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import TotalInventory from "../components/TotalInventory";

export default function distributer() {
  return (
    <div className="bg-slate-50 h-100">
      <Header />
      <div className="container mx-auto flex items-start justify-between mt-4">
        <div className="flex-col w-3/5 mr-2 mt-2">
          <h1 className="mb-4 ml-2  font-bold text-2xl">Marketplace</h1>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <TotalInventory />
      </div>
    </div>
  );
}
