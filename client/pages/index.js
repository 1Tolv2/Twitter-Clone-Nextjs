import React, { useEffect, useState } from "react";
import Messageboard from "../components/molecules/Messageboard";
import Layout from "../components/layouts/Layout";
import { API } from "../components/API";
import MessageMaker from "../components/molecules/MessageMaker";

export default function Home({ data }) {
  const [messageList, setMessageList] = useState(null);

  useEffect(() => {
    setMessageList(data);
  }, [data]);
  return (
    <Layout>
      <Messageboard data={messageList}>
        <MessageMaker />
      </Messageboard>
    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(API + "/messages", {
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  console.log(data);

  return { props: { data } };
}
