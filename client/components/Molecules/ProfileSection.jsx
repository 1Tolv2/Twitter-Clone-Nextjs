import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { API } from "../API";
import Button from "../atoms/Button";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
  background-color: white;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  img {
    width: 100%;
    height: auto;
  border-radius: 5px;

  }
  ul {
    list-style: none;
    margin: 10px 0;
    padding: 0;
    li {
      span {
        margin: 0 5px;
      }
    }
  }
`;

const StyledHeader = styled.h2`
  margin: 0 10px;
`;

export default function ProfileSection({ data }) {
  console.log(data)
  const [subscribed, setSubscribed] = useState(null)
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem("Token");
  if (token) {
    fetch(`${API}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((fetchData) => {
        setSubscribed(fetchData.data.user.subscribedTo.includes(data?.username))})
  }
}, [data]);

  async function handleOnClick() {
    const token = localStorage.getItem("Token")

    if (token){
    const user = router.query.user;
    const res = await fetch(`${API}/users/${user}/subscribe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    await res.json()
    router.reload(window.location.pathname)
    } else router.push("/login")
  }
  return (
    <StyledContainer>
      {data && (
        <>
          <div>
            <img src={`${API}/${data.image}`} />
          </div>
          <div>
            <StyledHeader>{data.username}</StyledHeader>
            <ul>
              {data.settings.name && <li>{`${data.firstname} ${data.lastname}`}</li>}
              {data.settings.email && <li>{data.email}</li>}
              <li>
                <span>Followers: {data.subscribers.length}</span>
                <span>Following: {data.subscribedTo.length}</span>
              </li>
              <li>
                <Button width="25" handleOnClick={handleOnClick}>{subscribed ? "Unfollow":"Follow"}</Button>
              </li>
            </ul>
          </div>
        </>
      )}
    </StyledContainer>
  );
}
