import React, { useEffect } from "react";
import Messageboard from "../components/Messageboard";
import Layout from "../components/Layout";

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
    <Layout>
      <Messageboard />
    </Layout>
  );
}
