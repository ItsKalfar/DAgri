import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { ProjectContext } from "../context/ProjectContext";
import ProductCard from "../components/ProductCard";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const { currentAccount, allProducts, isLoading } = useContext(ProjectContext);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-full" id="index">
        <Header />
        <div className="flex flex-col">
          {currentAccount ? (
            <div className="container mx-auto">
              {isLoading ? (
                <div className="w-full h-screen flex items-center justify-center">
                  <Oval
                    height={40}
                    width={40}
                    color="blue"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                  />
                </div>
              ) : (
                <div>
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
                      <div key={tokenId}>
                        <ProductCard
                          name={productName}
                          tokenID={tokenID}
                          quantity={quantity}
                          price={price}
                          Category={categoery}
                          Seller={Seller}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="container mx-auto p-8 ">
              <h1>Please Connect your wallet first</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
