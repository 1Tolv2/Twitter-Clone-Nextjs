import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Messageboard from "../../components/molecules/Messageboard";
import Layout from "../../components/layouts/Layout";
import { API } from "../../components/API";
import MessageMaker from "../../components/molecules/MessageMaker";

export default function Home({ data }) {
  const [messageList, setMessageList] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { hashtag } = router.query;
    if (hashtag && data) {
      const hashtagData = data.find((item) => {
        return item.tag_name == hashtag;
      });
      setMessageList(hashtagData.messages);
    }
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
  const res = await fetch(`${API}/hashtags`, {
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();
  return { props: { data } };
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/hashtags`, {
    headers: { "Content-Type": "application/json" },
  });
  const { data } = await res.json();

  const paths = data.map((item) => {
    return { params: { hashtag: item.tag_name.replace("#", "%23") } };
  });
  return { paths, fallback: true };
}
