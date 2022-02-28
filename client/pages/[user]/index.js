import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import Layout from "../../components/Layouts/Layout";
import Messageboard from "../../components/Molecules/Messageboard";

export default function User({ userData }) {
  const router = useRouter();
  const [userMessageList, setUserMessageList] = useState(null);

  useEffect(() => {
    setUserMessageList(userData.data);
  }, [userData]);
  return (
    <Layout>
      Hej
      <Messageboard data={userMessageList}></Messageboard>
    </Layout>
  );
}

export async function getStaticProps() {
  const userRes = await fetch(`${API}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await userRes.json();
  // console.log("USERDATA:", userData.data);
  const messageRes = await fetch(`${API}/messages`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const messageData = await messageRes.json();
  // console.log("MESSAGEDATA:", messageData.data);
  userData.data.map((user) => {
    user.totalMessageList = [];
    messageData.data.forEach((item) => {
      // console.log("ITEM:", item);
      // console.log("USER:", user);
      return item.username === user.username
        ? user.totalMessageList.push(item)
        : null;
    });
  });

  return { props: { userData } };
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/users`, {
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  const paths = data.map((user) => {
    return {
      params: { user: user.username },
    };
  });
  return { paths, fallback: false };
}
