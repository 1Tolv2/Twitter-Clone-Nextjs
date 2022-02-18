import React, { useEffect, useState } from "react";
import Messageboard from "../components/Messageboard";
import Layout from "../components/Layout";
import { API } from "../components/API";

export default function Home({ data }) {
  console.log(API);
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
  const res = await fetch(API, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return { props: { data } };
}
