import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "../atoms/Button";
import { useRouter } from "next/router";
import { API } from "../API";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-flow: wrap row;
  justify-self: start;
  width: 100%;
  background-color: #fdfcdc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  button {
    background-color: #f07167;
  }
  h2 {
    height: fit-content;
    width: 100%;
  }
  img{
width: 100%;
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default function SideSection() {
  const [signedInUser, setSignedInUser] = useState(null);
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
        .then((data) => setSignedInUser(data.data.user));
    }
  }, []);

  function upperCaseName(name) {
    const modifiedName = name.replace(name[0], name[0].toUpperCase());
    return modifiedName;
  }

  async function handleOnClick() {
    const token = localStorage.getItem("Token");
    const res = await fetch(`${API}/auth/api-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      localStorage.removeItem("Token");
      router.push("/login");
    }
  }
  return (
    <StyledContainer>
      {signedInUser ? (
        <>
          <h2>Hello {upperCaseName(signedInUser.username)}!</h2>
          <StyledList>
            <li>
              <Link href="/me">
                <a>
                  <img src={`${API}/${signedInUser.image}`} />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/me/settings">Settings</Link>
            </li>
            <Button handleOnClick={handleOnClick}>Log out</Button>
          </StyledList>
        </>
      ) : (
        <>
        <h2>Hello!</h2>
        <Link href="/login">Log in</Link>
        </>
      )}
    </StyledContainer>
  );
}
