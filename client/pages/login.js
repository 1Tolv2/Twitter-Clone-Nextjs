import React, { useState } from "react";
import { useRouter } from "next/router";
import { API } from "../components/API";
import LayoutCenterDiv from "../components/LayoutCenterDiv";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    console.log(API);
    console.log(payload);
    router.push("/");
  }
  return (
    <LayoutCenterDiv>
      <h2>Login</h2>
      <form onSubmit={handleOnSubmit}>
        <InputField
          type="text"
          id="username"
          value={username}
          setValue={setUsername}
          placeholder="Username"
        />
        <InputField
          type="text"
          id="password"
          value={password}
          setValue={setPassword}
          placeholder="Password"
        />
        <Button type="submit">Log in</Button>
      </form>
    </LayoutCenterDiv>
  );
}
