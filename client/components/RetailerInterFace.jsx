import React, { useContext } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { Oval } from "react-loader-spinner";
import { ProjectContext } from "../context/ProjectContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AiOutlineArrowRight } from "react-icons/ai";
import UserDetails from "./UserDetails";
import SearchDistributer from "./SearchDistributer";

export default function RetailerInterFace() {
  const {
    currentAccount,
    allProducts,
    isLoading,
    distributerInventory,
    productDistributer,
  } = useContext(ProjectContext);
  return (
    <div className="h-full">
      <Header />
      <div className="container-lg mx-auto">
        {currentAccount ? (
          <div>
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
              <div className="container mx-auto py-8 flex items-start ">
                <div className="flex flex-col items-start">
                  <SearchDistributer />
                  <UserDetails />
                </div>

                <div className="flex w-full ml-5 flex-col overflow-hidden">
                  <div className="flex flex-col z-0">
                    <h1 className="flex uppercase mb-8 text-2xl ml-5 font-bold">
                      Distributers <AiOutlineArrowRight className="mt-1 ml-4" />
                    </h1>
                    <div className="w-96 mb-8 z-0 ">
                      {productDistributer.productName ? (
                        <ProductCard
                          name={productDistributer.productName}
                          tokenID={productDistributer.tokenId.toString()}
                          quantity={productDistributer.productQuantity.toString()}
                          price={productDistributer.productPrice.toString()}
                          Category={productDistributer.cateory}
                          Seller={productDistributer.seller}
                        />
                      ) : (
                        <div>
                          <h1 className="font-semibold text-red-600 ml-8">
                            Not Found!
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="flex uppercase mb-8 text-2xl ml-5 font-bold">
                      MarketPlace <AiOutlineArrowRight className="mt-1 ml-4" />
                    </h1>
                    <div className="card-box">
                      {distributerInventory.map((product) => {
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
                          <div key={tokenId} className="mb-8">
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
