import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-auto flex flex-col items-center justify-center h-screen">
        <h1>You are a..</h1>
        <div className="">
          <ul>
            <li className="border-2 text-center rounded-full cursor-pointer px-6 py-2 border-blue-500 my-2">
              <Link href="/farmer">
                <h2>Farmer</h2>
              </Link>
            </li>
            <li className="border-2 text-center rounded-full cursor-pointer px-6 py-2 border-blue-500 my-2">
              <Link href="/distributer">
                <h2>Distributer</h2>
              </Link>
            </li>
            <li className="border-2 text-center rounded-full cursor-pointer px-6 py-2 border-blue-500 my-2">
              <Link href="/retailer">
                <h2>Retailer</h2>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
