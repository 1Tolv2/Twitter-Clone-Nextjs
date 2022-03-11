import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {postNewUser, getUser} from "../../API";
import InputField from "../../atoms/InputField/index";
import * as s from "./styles";

export default function TwoFieldForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginForm, setLoginForm] = useState(null) 
  const [iconState, setIconState] = useState("close")
useEffect(() => {
  setLoginForm(false)
}, [])
  function toggleIcon() {
    setLoginForm(!loginForm);
    loginForm ? setIconState("close") : setIconState("open");
    setErrorMessage(null)
  }
  async function handleOnPost(e) {
    e.preventDefault()
    console.log(newUsername, newPassword)
    const res = await postNewUser({newUsername, newPassword}, setErrorMessage)
      res?.ok && toggleIcon()
  }
  async function handleOnGet(e) {
    e.preventDefault()
    const data = await getUser({username, password}, setErrorMessage)
    if (data.token) {
      localStorage.setItem("Token", data.token);
      router.push("/");
    }
  }
  return (
    <s.Wrapper className={iconState}>
      <s.IconButton onClick={toggleIcon} className={iconState}><s.Icon className={iconState}></s.Icon></s.IconButton>
    <s.PrimaryContainer className={iconState}>
      <h2>LOGIN</h2>
      <form>
        <InputField
          type="text"
          id="username"
          value={username}
          setValue={setUsername}
          placeholder="Enter username..."
          required={true}
        />
        <InputField
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
          placeholder="Enter password..."
          required={true}
        />
        <s.Button onClick={handleOnGet}>sign in</s.Button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}

    </s.PrimaryContainer>
    <div>
      <s.HiddenContainer className={iconState}>
        <h2>SIGN UP</h2>
        <form>
          <InputField
            type="text"
            id="newUsername"
            value={newUsername}
            setValue={setNewUsername}
            placeholder="Enter username..."
            required={true}
          />
          <InputField
            type="password"
            id="newPassword"
            value={newPassword}
            setValue={setNewPassword}
            placeholder="Enter password..."
            required={true}
          />
          <s.Button onClick={handleOnPost}>Create user</s.Button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}

      </s.HiddenContainer>
    </div>
    </s.Wrapper>
  );
}
