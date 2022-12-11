import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-blue-50 h-screen">
      <Link href="/farmer">Farmer</Link>
      <Link href="/distributer">Distributer</Link>
      <Link href="/retailer">Retailer</Link>
    </div>
  );
}
