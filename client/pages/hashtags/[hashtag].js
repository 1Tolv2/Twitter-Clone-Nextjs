import React, { useEffect, useState } from "react";
import Messageboard from "../../components/Messageboard";
import Layout from "../../components/Layout";
import { API } from "../../components/API";
import MessageMaker from "../../components/MessageMaker";

export default function Home() {
  const [messageList, setMessageList] = useState(null);

  useEffect(() => {
    async () => {
      const res = await fetch(API, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setMessageList(data);
    };
  }, []);
  return (
    <Layout>
      <Messageboard data={messageList}>
        <MessageMaker />
      </Messageboard>
    </Layout>
  );
}
// export async function getStaticProps() {
//   const res = await fetch(API, {
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await res.json();

//   return { props: { data } };
// }
