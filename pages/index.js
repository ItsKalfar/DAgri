import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ProjectContext } from "../context/ProjectContext";
import { ethers } from "ethers";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { currentAccount, allProducts } = useContext(ProjectContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-blue-50 h-full" id="index">
        <Header />
        <div className="flex flex-col">
          {currentAccount ? (
            <div className="container mx-auto">
              {allProducts.map((product) => {
                let {
                  productName,
                  tokenId,
                  productQuantity,
                  productPrice,
                  categoery,
                  seller,
                } = product;

                let tokenID = tokenId.toString();
                let quantity = productQuantity.toString();
                let newPrice = productPrice * 0.000000000000000001;
                let price = newPrice.toString();
                let Seller = seller.toString();

                return (
                  <ProductCard
                    name={productName}
                    tokenID={tokenID}
                    quantity={quantity}
                    price={price}
                    Category={categoery}
                    Seller={Seller}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <h1>Please Connect your wallet first</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
