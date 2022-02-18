import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";

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
  function logOutUser() {
    router.push("/");
  }
  return (
    <StyledContainer>
      <h2>Hello User!</h2>
      <StyledList>
        <li>
          <Link href="/user/settings">Settings</Link>
        </li>
        <Button onClick={logOutUser}>
          <Link href="/login">Log out</Link>
        </Button>
      </StyledList>
    </StyledContainer>
  );
}
