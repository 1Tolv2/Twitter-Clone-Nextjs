import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import Layout from "../../components/layouts/Layout";
import Messageboard from "../../components/molecules/Messageboard";
import ProfileSection from "../../components/molecules/ProfileSection";

export default function User() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = router.query.user;
    if (user) {
      fetch(`${API}/users/${user}`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
        });
    }
  }, [router.query.user]);
  return (
    <Layout>
      {userData && (
        <>
          <ProfileSection data={userData[0]} />
          <Messageboard
            data={userData[0].messages}
            userData={userData}
          ></Messageboard>
        </>
      )}
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
