import React, { useEffect, useState } from "react";
import Messageboard from "../components/Messageboard";
import Layout from "../components/Layout";

export default function Home({ data }) {
  const [messageList, setMessageList] = useState(null);
  useEffect(() => {
    setMessageList(data);
  }, []);
  return (
    <Layout>
      <Messageboard data={messageList} />
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:9000/", {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return { props: { data } };
}
