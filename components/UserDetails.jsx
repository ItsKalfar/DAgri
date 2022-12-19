import React, { useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { async } from "@firebase/util";
import { ProjectContext } from "../context/ProjectContext";
import { toast } from "react-hot-toast";
import { GrLocation, GrUserWorker } from "react-icons/gr";
import { BsPersonCircle, BsPerson } from "react-icons/bs";

export default function UserDetails() {
  const { currentAccount } = useContext(ProjectContext);
  const [userWallet, setUserWallet] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    location: "",
    profession: "",
  });

  const handleUser = async () => {
    try {
      if (userWallet == "") {
        toast.error("Please provide valid address");
      }
      if (
        typeof currentAccount !== "undefined" &&
        typeof userWallet !== "undefined"
      ) {
        const response = await getDocs(
          query(
            collection(db, "users"),
            where("userAddress", "==", userWallet.toLowerCase())
          )
        );
        response.forEach((user) => {
          setUserData({
            name: user.data().UserName,
            location: user.data().userLocation,
            profession: user.data().userProf,
          });
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-white px-12 py-16 rounded shadow-lg text-black my-8 w-96">
        <h1 className="uppercase mb-8 text-2xl text-center font-bold">
          user detailes
        </h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Wallet Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter Address Here..."
            onChange={(e) => setUserWallet(e.target.value)}
          />
        </div>

        <div
          className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center cursor-pointer font-semibold"
          onClick={handleUser}
        >
          Get Details
        </div>
        <div>
          {userData ? (
            <div className="py-4 -mb-8">
              <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900 ml-1">
                <div className="flex items-start">
                  {" "}
                  <BsPerson className="mr-1 mt-1" />
                  Name :
                </div>

                <div className="ml-2 mt-2 py-1 px-8 bg-gray-200 rounded-full text-gray-500 flex items-center w-full">
                  {userData.name.toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
                <div className="flex items-start">
                  <GrLocation className="mr-1 mt-1" /> Location :
                </div>
                <div className="ml-2 mt-2 py-1 px-8 bg-gray-200 rounded-full text-gray-500 flex items-center w-full">
                  {" "}
                  {userData.location.toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col items-start mb-4 text-md font-medium text-gray-900">
                <div className="flex items-start">
                  <GrUserWorker className="mr-1 mt-1" /> Profession :
                </div>
                <div className="ml-2 mt-2 py-1 px-8 bg-gray-200 rounded-full text-gray-500 flex items-center w-full">
                  {" "}
                  {userData.profession.toUpperCase()}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
