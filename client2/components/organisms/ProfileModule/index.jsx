import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../layouts/mainLayout";
import { API } from "../../API";
import * as s from "./styles";

export default function ProfileModule({ data }) {
  const [user, setUser] = useState(null);
  const [subscribed, setSubscribed] = useState(null);

  const { userData, setUserData } = useContext(UserContext);

  const router = useRouter();
  useEffect(() => {
    setUser(data.find((user) => user.username === router.query.user));
  }, [router.query.user]);

  useEffect(() => {
    setSubscribed(userData?.data.user.subscribedTo.includes(user?.username));
  }, [userData && user]);

  async function handleOnClick() {
    const token = localStorage.getItem("Token");

    if (token) {
      const user = router.query.user;
      const res = await fetch(`${API}/users/${user}/subscribe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await res.json();
      setSubscribed(!subscribed);
      router.reload(window.location.pathname)
    } else router.push("/login");
  }
  function upperCaseName(name) {
    const modifiedName = name.replace(name[0], name[0].toUpperCase());
    return modifiedName;
  }
  return (
    <s.Container>
      {user && (
        <>
          <s.ImageContainer>
            <img src={`${API}/${user.image}`} />
          </s.ImageContainer>
          <s.InfoContainer>
            <div>
              <h2>
                {user.settings.name
                  ? `${user.firstname} ${user.lastname}`
                  : upperCaseName(user.username)}
              </h2>
              {user.settings.email && <p>{user.email}</p>}
              <i>@{user.username}</i></div>
            <s.FollowContainer>
                <div>
                    <span><b>{user.subscribers.length}</b> Followers</span>
                    <span><b>{user.subscribedTo.length}</b> Following</span>
                </div>

              <s.Button onClick={handleOnClick}>
                {subscribed ? "Unfollow" : "Follow"}
              </s.Button>
            </s.FollowContainer>
          </s.InfoContainer>
        </>
      )}
    </s.Container>
  );
}
