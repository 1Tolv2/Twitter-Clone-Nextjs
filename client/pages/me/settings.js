import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import LayoutUser from "../../components/layouts/LayoutUser";

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
  margin-bottom: 10px;
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
const StyledButton = styled.button`
  width: ${({ width }) => (width ? width : 100)}%;
  margin-top: 20px;
  padding: 15px;
  border-radius: 30px;
  border-style: none;
  background-color: #00afb9;
  color: white;
  cursor: pointer;
`;

const StyledHeader = styled.h2`
  margin: 0 10px;
`;

export default function settings() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  console.log(email);
  console.log(name);
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
        .then(({ data }) => setUserData(data));
    }
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(email);
    console.log(name);
  }

  return (
    <LayoutUser>
      {userData && (
        <>
          <StyledContainer>
            <div>
              <img src={`${API}/${userData.user.image}`} />
            </div>
            <div>
              <StyledHeader>{userData.user.username}</StyledHeader>
              <ul>
                {userData.user.settings.name && <li>{userData.user.name}</li>}
                {userData.user.settings.email && <li>{userData.user.email}</li>}
                <li>
                  <span>Followers: {userData.user.subscribers.length}</span>
                  <span>Following: {userData.user.subscribedTo.length}</span>
                </li>
              </ul>
            </div>
          </StyledContainer>
          <StyledContainer>
            <form onSubmit={handleOnSubmit}>
              <input
                type="checkbox"
                value={email}
                onChange={(e) => setEmail(e.target)}
              />
              E-mail
              <br />
              <input type="checkbox" onChange={(e) => setName(e.target)} />
              Name
              <br />
              <StyledButton>Save</StyledButton>
            </form>
          </StyledContainer>
        </>
      )}
    </LayoutUser>
  );
}
