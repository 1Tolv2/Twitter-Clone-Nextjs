import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import Layout from "../../components/layouts/Layout";
import Messageboard from "../../components/molecules/Messageboard";

export default function User() {
  const router = useRouter();
  const [userMessageList, setUserMessageList] = useState(null);

  useEffect(() => {
    const user = router.query.user;
    console.log(user);
    if (user) {
      fetch(`${API}/users/${router.query.user}`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setUserMessageList(data.data[0].messageList));
    }
  }, [router.query.user]);
  return (
    <Layout>
      Hej
      <Messageboard data={userMessageList}></Messageboard>
    </Layout>
  );
}

// export async function getStaticProps({ params }) {
//   console.log(params.user);
//   const userRes = await fetch(`${API}/${params.user}`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// const userData = await userRes.json();
// const messageRes = await fetch(`${API}/messages`, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// const messageData = await messageRes.json();
// userData.data.map((user) => {
//   user.totalMessageList = [];
//   messageData.data.forEach((item) => {
//     return item.username === user.username
//       ? user.totalMessageList.push(item)
//       : null;
//   });
// });

//   return { props: { userData } };
// }
/*Nedan fungerar men ej gSSProps */
// export async function getStaticPaths() {
//   const res = await fetch(`${API}/users`, {
//     headers: { "Content-Type": "application/json" },
//   });
//   const { data } = await res.json();
//   const paths = data.map((user) => {
//     return {
//       params: { user: user.username },
//     };
//   });
//   return { paths, fallback: false };
// }
