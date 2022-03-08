import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { postNewUserData } from "../components/API";
import LayoutCenterDiv from "../components/layouts/LayoutCenterDiv";
import Header from "../components/atoms/Header";
import TwoFieldForm from "../components/molecules/TwoFieldForm";

export default function CreateUser() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const res = await postNewUserData({ username, password }, setErrorMessage);
    res.ok && router.push("/login");
  }
  return (
    <LayoutCenterDiv>
      <Header color="black">Create User</Header>
      <TwoFieldForm
        handleOnSubmit={handleOnSubmit}
        states={{ username, setUsername, password, setPassword }}
        errorMessage={errorMessage}
        buttonText="Create user"
      />
      <p>
        Already have an account? <br />
        <Link href="/login">
          <a>
            <strong>Click here!</strong>
          </a>
        </Link>
      </p>
    </LayoutCenterDiv>
  );
}
