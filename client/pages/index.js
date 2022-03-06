import React, { useEffect, useState } from "react";
import Messageboard from "../components/molecules/Messageboard";
import Layout from "../components/layouts/Layout";
import { API } from "../components/API";
import MessageMaker from "../components/molecules/MessageMaker";

export default function Home() {
  const [messageList, setMessageList] = useState(null);

  async function renderMessageList(headers) {
    const res = await fetch(`${API}/messages`, headers);
    const { data } = await res.json();
    setMessageList(data);
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
      renderMessageList(headers);
    } else {
      renderMessageList(headers);
    }
  }, []);
  return (
    <Layout>
      <Messageboard data={messageList}>
        <MessageMaker />
      </Messageboard>
    </Layout>
  );
}
