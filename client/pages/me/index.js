import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import LayoutUser from "../../components/layouts/LayoutUser";
import Messageboard from "../../components/molecules/Messageboard";
import Button from "../../components/atoms/Button";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto auto;
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

const InfoContainer = styled.div`
  margin: 10px 0;
  span {
    margin: 0 5px;
  }
`;

const StyledHeader = styled.h2`
  margin: 0 10px;
`;

export default function index() {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
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
        .then(({ data }) => {
          setUserData(data);
        });
    }
  }, []);

  function handleOnClick() {
    router.push("/me/settings");
  }

  return (
    <LayoutUser>
      {userData && (
        <>
          <StyledContainer>
            <div>
              <img src={`${API}/${userData.user.image}`} />
            </div>
            <ul>
              {console.log(userData.user.settings)}
              <StyledHeader>{userData.user.username}</StyledHeader>
              {userData.user.settings.name && (
                <li>{`${userData.user.firstname} ${userData.user.lastname}`}</li>
              )}
              {userData.user.settings.email && <li>{userData.user.email}</li>}
              <InfoContainer>
                <span>Followers: {userData.user.subscribers.length}</span>
                <span>Following: {userData.user.subscribedTo.length}</span>
              </InfoContainer>
            </ul>
            <div>
              <Button width="100" handleOnClick={handleOnClick}>
                Settings
              </Button>
            </div>
          </StyledContainer>
          <Messageboard data={userData.messageList} />
        </>
      )}
    </LayoutUser>
  );
}
