import React, { useContext } from "react";
import SellProduct from "../components/SellProduct";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { Oval } from "react-loader-spinner";
import { ProjectContext } from "../context/ProjectContext";

export default function FarmerInterFace() {
  const { isSignedIn, currentAccount, allProducts, isLoading, userProfession } =
    useContext(ProjectContext);
  return (
    <div className="h-full">
      <Header />
      <div>
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
              <div className="container mx-auto py-8 flex items-start">
                <SellProduct className="border-black border-2" />
                <div className="grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                  {allProducts.map((product) => {
                    let {
                      productName,
                      tokenId,
                      productQuantity,
                      productPrice,
                      cateory,
                      seller,
                    } = product;

                    let tokenID = tokenId.toString();
                    let quantity = productQuantity.toString();
                    let price = productPrice.toString();
                    let Seller = seller.toString();
                    let category = cateory.toUpperCase();

                    return (
                      <div key={tokenId} className="w-96 ml-4">
                        <ProductCard
                          name={productName}
                          tokenID={tokenID}
                          quantity={quantity}
                          price={price}
                          Category={category}
                          Seller={Seller}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="container mx-auto p-8 flex item-center justify-center">
            <h1>Please Connect your wallet first</h1>
          </div>
        )}
      </div>
    </div>
  );
}
