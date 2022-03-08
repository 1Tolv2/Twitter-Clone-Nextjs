import React, { useEffect, useState } from "react";
import { API } from "../../components/API";
import Layout from "../../components/layouts/Layout";
import Messageboard from "../../components/molecules/Messageboard";
import ProfileSection from "../../components/molecules/ProfileSection";

export default function User(data) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(data.userData.data[0]);
  }, [data]);

  return (
    <Layout>
      {userData && (
        <>
          <ProfileSection data={userData} />
          <Messageboard
            data={userData.messages}
            userData={[userData]}
          ></Messageboard>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const userRes = await fetch(`${API}/users/${params.user}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await userRes.json();
  const messageRes = await fetch(`${API}/messages`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const messageData = await messageRes.json();
  userData.data.map((user) => {
    user.totalMessageList = [];
    messageData.data.forEach((item) => {
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
