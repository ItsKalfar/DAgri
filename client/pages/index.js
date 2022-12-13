import React, { useContext } from "react";
import Link from "next/link";
import InputFrom from "../components/InputFrom";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { DAgriContext } from "../context/DAgriContext";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const {} = useContext(DAgriContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-blue-50 h-screen">
        <Header />
        <div className="container mx-auto flex items-start justify-between mt-4">
          <InputFrom />
          <div className="flex flex-col w-3/5 ml-2"></div>
        </div>
      </div>
    </>
  );
}
