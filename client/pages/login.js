import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { postLoginData } from "../components/API";
import LayoutCenterDiv from "../components/layouts/LayoutCenterDiv";
import Header from "../components/atoms/Header";
import TwoFieldForm from "../components/molecules/TwoFieldForm";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const data = await postLoginData({ username, password }, setErrorMessage);
    if (data.token) {
      localStorage.setItem("Token", data.token);
      router.push("/");
    }
  }
  return (
    <LayoutCenterDiv>
      <Header color="black">Login</Header>
      <TwoFieldForm
        handleOnSubmit={handleOnSubmit}
        states={{ username, setUsername, password, setPassword }}
        errorMessage={errorMessage}
        buttonText="Log in"
      />
      <p>
        New to the Twooter?{" "}
        <Link href="/create-user">
          <a>
            <strong>Click here!</strong>
          </a>
        </Link>
      </p>
    </LayoutCenterDiv>
  );
}
