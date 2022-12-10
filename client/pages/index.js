import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>DAgri - Welcome</title>
        <meta name="author" content="Sagar Gund" />
        <meta name="distribution" content="global" />
        <meta name="language" content="English" />
      </Head>
      <div>
        <Link href="/farmer">Farmer</Link>
        <Link href="/distributer">Distributer</Link>
        <Link href="/retailer">Retailer</Link>
      </div>
    </>
  );
}
