import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API } from "../components/API";
import LayoutCenterDiv from "../components/layouts/LayoutCenterDiv";
import InputField from "../components/atoms/InputField";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import RedParagraph from "../components/atoms/RedParagraph";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
    } else {
      setErrorMessage("Incorrect username or password, please try again.");
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
        {errorMessage && <RedParagraph>{errorMessage}</RedParagraph>}
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
