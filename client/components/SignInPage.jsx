import React, { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { toast } from "react-hot-toast";

export default function SignInPage() {
  const { currentAccount, signInUser } = useContext(ProjectContext);

  const [user, setUser] = useState({
    name: "",
    location: "",
    profession: "",
    contactNo: "",
    emailAddress: "",
  });
  const handleSignIn = async () => {
    if (user.name && user.location && user.profession) {
      signInUser(
        user.name,
        user.location,
        user.profession,
        currentAccount,
        user.contactNo,
        user.emailAddress
      );
    } else {
      toast.error("Please provide all the data");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen w-1/3">
      <div className="bg-white px-12 py-14 rounded-lg shadow-lg border-gray-200 border-2 text-blac w-full flex flex-col items-center">
        <h1 className="uppercase mb-8 text-3xl text-center font-bold ">
          Sign In
        </h1>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your name..."
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your location..."
            onChange={(e) =>
              setUser((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Contact No
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="tel"
            placeholder="Enter your contact no..."
            onChange={(e) =>
              setUser((prev) => ({ ...prev, contactNo: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email..."
            onChange={(e) =>
              setUser((prev) => ({ ...prev, emailAddress: e.target.value }))
            }
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Your Profession
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) =>
              setUser((prev) => ({ ...prev, profession: e.target.value }))
            }
          >
            <option className="p-2.5" defaultValue="others">
              You Are...
            </option>
            <option className="p-2.5" value="farmer">
              Farmer
            </option>
            <option className="p-2.5" value="distributer">
              Distributer
            </option>
            <option className="p-2.5" value="retailer">
              Retailer
            </option>
            <option className="p-2.5" value="consumer">
              Consumer
            </option>
          </select>
        </div>
        <div className="mb-4 w-full flex mt-6  justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-900 rounded-full text-white  py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-between cursor-pointer font-semibold"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
