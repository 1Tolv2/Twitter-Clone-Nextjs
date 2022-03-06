import React, { useEffect, useState } from "react";
import Messageboard from "../components/molecules/Messageboard";
import Layout from "../components/layouts/Layout";
import { API } from "../components/API";
import MessageMaker from "../components/molecules/MessageMaker";

export default function Home() {
  const [messageList, setMessageList] = useState(null);
  const [userList, setUserList] = useState(null);

  async function getUserList() {
    const res = await fetch(`${API}/users`, {
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await res.json();
    console.log(data);
    setUserList(data);
  }
  async function getMessageList(headers) {
    const res = await fetch(`${API}/messages`, headers);
    const { data } = await res.json();
    setMessageList(data);
    getUserList();
  }

  useEffect(() => {
    const token = localStorage.getItem("Token");
    let headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      headers.headers["Authorization"] = `Bearer ${token}`;
      getMessageList(headers);
    } else {
      getMessageList(headers);
    }
  }, []);
  return (
    <Layout>
      <Messageboard data={messageList} userData={userList}>
        <MessageMaker />
      </Messageboard>
    </Layout>
  );
}
