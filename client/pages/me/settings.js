import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { API } from "../../components/API";
import LayoutUser from "../../components/layouts/LayoutUser";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
  background-color: white;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: auto;
  }
  ul {
    list-style: none;
    margin: 10px 0;
    padding: 0;
    li {
      span {
        margin: 0 5px;
      }
    }
  }
`;
const StyledButton = styled.button`
  width: ${({ width }) => (width ? width : 100)}%;
  margin-top: 20px;
  padding: 15px;
  border-radius: 30px;
  border-style: none;
  background-color: #00afb9;
  color: white;
  cursor: pointer;
`;

const StyledHeader = styled.h2`
  margin: 0 10px;
`;

export default function settings() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [settingEmail, setSettingEmail] = useState("");
  const [settingName, setSettingName] = useState("");
  const [image, setImage] = useState("");

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      fetch(`${API}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          setUserData(data);
          setName(`${data.user.firstname} ${data.user.lastname}`);
          setEmail(data.user.email);
          setSettingEmail(data.user.settings.email);
          setSettingName(data.user.settings.name);
        });
    }
  }, []);

  async function handleOnSubmit(e) {
    e.preventDefault();
    const splitName = name.split(" ");

    const formData = new FormData();
    formData.append("firstname", splitName[0]);
    formData.append("lastname", splitName[1]);
    formData.append("email", email);
    formData.append("setting_name", settingName);
    formData.append("setting_email", settingEmail);
    formData.append("image", e.target[2]?.files[0]);

    const token = localStorage.getItem("Token");
    await fetch(`${API}/users/me/settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    router.push("/me");
  }

  function toggleEmailSettings() {
    setSettingEmail(!settingEmail);
  }
  function toggleNameSettings() {
    setSettingName(!settingName);
  }

  return (
    <LayoutUser>
      {userData && (
        <>
          <StyledContainer>
            <div>
              <img src={`${API}/${userData.user.image}`} />
            </div>
            <div>
              <StyledHeader>{userData.user.username}</StyledHeader>
              <ul>
                {userData.user.settings.name && (
                  <li>{`${userData.user.firstname} ${userData.user.lastname}`}</li>
                )}
                {userData.user.settings.email && <li>{userData.user.email}</li>}
                <li>
                  <span>Followers: {userData.user.subscribers.length}</span>
                  <span>Following: {userData.user.subscribedTo.length}</span>
                </li>
              </ul>
            </div>
          </StyledContainer>
          <StyledContainer>
            <form onSubmit={handleOnSubmit} encType="multipart/form-data">
              Name:
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              Email:
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="file"
                accept="image/*"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <input
                type="checkbox"
                checked={settingEmail}
                onChange={toggleEmailSettings}
              />
              E-mail
              <br />
              <input
                type="checkbox"
                checked={settingName}
                onChange={toggleNameSettings}
              />
              Name
              <br />
              <StyledButton type="submit">Save</StyledButton>
            </form>
          </StyledContainer>
        </>
      )}
    </LayoutUser>
  );
}
