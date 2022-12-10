import React, { useState, useContext } from "react";
import { DAgriContext } from "../context/DAgriContext";

import Link from "next/link";

import Head from "next/head";

export default function logIn() {
  const [values, setValues] = useState({
    email: "",
    pass: "",
    prof: "",
  });
  const { signInUser } = useContext(DAgriContext);

  const handleSignIn = () => {
    signInUser(values.email, values.pass, values.prof);
  };
  return (
    <>
      <Head>
        <title>DAgri - Login Page</title>
      </Head>
      <div className="bg-blue-50 min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            {" "}
            <h1 className="uppercase mb-8 text-3xl text-center font-bold ">
              log in
            </h1>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Please enter email..."
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Please enter password..."
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, pass: e.target.value }))
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Select Proffession
              </label>
              <select
                id="profession"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, prof: e.target.value }))
                }
              >
                <option selected>You are a...</option>
                <option value="farmer">Farmer</option>
                <option value="distributer">Distributer</option>
                <option value="retailer">Retailer</option>
                <option value="consumer">Consumer</option>
              </select>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-900 rounded-full text-white font-bold py-3 px-9 focus:outline-none focus:shadow-outline uppercase flex items-center justify-center w-full mt-8"
              onClick={handleSignIn}
            >
              Log In
            </button>
          </div>
          <div className="text-grey-dark mt-6">
            Don't have an account yet?
            <Link
              className="mt-4 font-medium text-blue-600 hover:underline ml-1"
              href="/"
            >
              Create Account
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
}
