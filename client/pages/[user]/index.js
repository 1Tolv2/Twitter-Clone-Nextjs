import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import Layout from "../../components/Layout";
import Messageboard from "../../components/Messageboard";

export default function User() {
  const router = useRouter();
  const [userMessageList, setUserMessageList] = useState(null);

  useEffect(() => {
    // setUserMessageList(data);
    // console.log(userMessageList);
    const fetchData = async () => {
      const res = await fetch(API, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      const user = router.query;

      console.log(user.user);
      const messageList = data.filter((message) => {
        return message.author === user.user;
      });

      return setUserMessageList(messageList);
    };

    fetchData();
  }, [router.query]);
  return (
    <Layout>
      <Messageboard data={userMessageList}></Messageboard>
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

// export async function getStaticPaths() {
//   const res = await fetch(`${API}/users`, {
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await res.json();

//   const pathList = data.map((user) => {
//     return {
//       params: { id: user.id.toString() },
//     };
//   });
//   return { pathList, fallback: false };
// }
