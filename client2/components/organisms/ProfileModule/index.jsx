import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import {UserContext} from '../../layouts/mainLayout'
import { API } from "../../API";
import * as s from "./styles";


export default function ProfileModule({ data }) {
  const [user, setUser] = useState(null);
  const [subscribed, setSubscribed] = useState(null)

  const {userData, setUserData} = useContext(UserContext)

  const router = useRouter();
  useEffect(() => {
    setUser(data.find((user) => user.username === router.query.user));
  }, [router.query.user]);

  useEffect(() => {
    setSubscribed(userData.data.user.subscribedTo.includes(user.username))
  }, [userData && user]);

  function handleOnClick(){}
  return (
    <s.Container>
      {user && (
        <>
          <s.ImageContainer>
            <img src={`${API}/${user.image}`} />
          </s.ImageContainer>
          <s.InfoContainer>
            <h2>
              {user.settings.name
                ? `${user.firstname} ${user.lastname}`
                : user.username}
            </h2>
            <i>@{user.username}</i>
            <div>
              <button onClick={handleOnClick}>
                {subscribed ? "Unfollow" : "Follow"}
              </button>
            </div>
          </s.InfoContainer>
        </>
      )}
    </s.Container>
  );
}
