import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "../Atoms/Button";
import { useRouter } from "next/router";
import { API } from '../API'

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
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export default function SideSection() {

  const router = useRouter();
async function handleOnClick() {
  const token = localStorage.getItem("Token")
  console.log(token)
  const res = await fetch(`${API}/auth/api-token`, {
    method: "GET",
    headers: { "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` },
  })
  if (res.ok){
    localStorage.removeItem("Token")
    router.push("/login")
  }
}
  return (
    <StyledContainer>
      <h2>Hello User!</h2>
      <StyledList>
        <li>
          <Link href="/user/settings">Settings</Link>
        </li>
        <Button handleOnClick={handleOnClick}>
          Log out
        </Button>
      </StyledList>
    </StyledContainer>
  );
}
