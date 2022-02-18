import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API } from "../components/API";
import LayoutCenterDiv from "../components/LayoutCenterDiv";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Header from "../components/Header";

export default function CreateUser() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    console.log(API);
    console.log(payload);
    router.push("/login");
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
          type="text"
          id="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
          required
        />
        <Button type="submit">Create User</Button>
      </form>
      <p>
        Already have an account? <br />
        <Link href="/login">
          <strong>Click here!</strong>
        </Link>
      </p>
    </LayoutCenterDiv>
  );
}
