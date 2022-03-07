import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API } from "../components/API";
import LayoutCenterDiv from "../components/layouts/LayoutCenterDiv";
import InputField from "../components/atoms/InputField";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import RedParagraph from "../components/atoms/RedParagraph";

export default function CreateUser() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    console.log(payload);
    const res = await fetch(`${API}/auth/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      setErrorMessage(
        "User already exists, please try again with a unique username"
      );
    }
    res.ok ? router.push("/login") : console.log(res);
  }
  return (
    <LayoutCenterDiv>
      <Header color="black">Create User</Header>
      <form onSubmit={handleOnSubmit}>
        <InputField
          type="text"
          id="username"
          value={username}
          setValue={setUsername}
          placeholder="Username"
          required
        />
        <InputField
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          required
        />
        {errorMessage && <RedParagraph>{errorMessage}</RedParagraph>}
        <Button type="submit">Create User</Button>
      </form>
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
