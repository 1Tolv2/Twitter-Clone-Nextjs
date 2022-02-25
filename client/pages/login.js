import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API } from "../components/API";
import LayoutCenterDiv from "../components/LayoutCenterDiv";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Header from "../components/Header";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    console.log(API);
    const res = await fetch(`${API}/auth/api-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("Token", data.token);
      router.push("/");
    }
  }
  return (
    <LayoutCenterDiv>
      <Header color="black">Login</Header>
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
        <Button type="submit">Log in</Button>
      </form>
      <p>
        New to the Mooer?{" "}
        <Link href="/create-user">
          <a>
            <strong>Click here!</strong>
          </a>
        </Link>
      </p>
    </LayoutCenterDiv>
  );
}
