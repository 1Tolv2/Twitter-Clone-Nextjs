import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import Layout from "../../components/layouts/Layout";
import Messageboard from "../../components/molecules/Messageboard";

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
//   const res = await fetch(`${API}/users`, {
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
//   const paths = data.map((user) => {
//     return {
//       params: { id: user.user_name },
//     };
//   });
//   console.log(paths);
//   return { paths, fallback: false };
// }
