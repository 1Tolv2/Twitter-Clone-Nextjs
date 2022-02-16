import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  function callAPI() {
    fetch("http://localhost:9000/", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  useEffect(() => {
    callAPI();
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello World!</h1>
      </main>
    </div>
  );
}
