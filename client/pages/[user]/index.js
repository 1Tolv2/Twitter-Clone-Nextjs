import React, { useEffect, useState } from "react";
import { API } from "../../components/API";
import Layout from "../../components/Layout";

export default function User({ data }) {
  const [userMessageList, setUserMessageList] = useState(null);
  // useEffect(() => {
  //   setUserMessageList(data);
  // }, [data]);
  return <Layout>UserPage</Layout>;
}

// export async function getStaticProps() {
//   const res = await fetch(API, {
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await res.json();

//   return { props: { data } };
// }

export async function getStaticPaths() {
  const res = await fetch(`${API}/users`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  const pathList = data.map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  });
  return { pathList, fallback: false };
}
