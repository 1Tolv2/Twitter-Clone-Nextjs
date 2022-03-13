import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../layouts/mainLayout";
import { API, getUserData } from "../../../../client/components/API";
import * as s from "./styles";
import Link from "next/link";

export default function EditModal({ modal }) {
  const router = useRouter();

  const { userData, setUserData } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [settingName, setSettingName] = useState(false);
  const [settingEmail, setSettingEmail] = useState(false);

  async function getUserData() {
    const token = localStorage.getItem("Token");
    if (token) {
      const res = await fetch(`${API}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(await res.json());
    }
  }

  useEffect(() => {
    const { firstname, lastname, email, settings } = userData.data.user;
          setName(`${firstname} ${lastname}`);
          setEmail(email);
          setSettingEmail(settings.email);
          setSettingName(settings.name);
  }, [userData]);

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
    getUserData()
    router.reload(window.location.pathname)
  }

  async function handleLogOut() {
    const token = localStorage.getItem("Token");
    const res = await fetch(`${API}/auth/api-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      localStorage.removeItem("Token");
      router.push("/login");
    }
  }


//   function toggleEditModal() {
//     modal.setEditModal(!modal.editModal)
//   }
//   function toggleNameSettings() {
//       setSettingName(!settingName)
//   }
//   function toggleEmailSettings() {
//     setSettingEmail(!settingEmail)

//   }
  return (
    <s.Container>
      <s.Fade onClick={() => modal.setEditModal(!modal.editModal)}></s.Fade>
      <s.Modal>
        {userData && (<><s.Form onSubmit={handleOnSubmit} encType="multipart/form-data">
          <div>
              <div>
                  Name:
                  <input
                  type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
              </div>
              <div>
                  Email:
                  <input
                  type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
              </div>
          
          <input
            type="file"
            accept="image/*"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <div>
              Name:
              <input
                type="checkbox"
                checked={settingName}
                onChange={() => setSettingName(!settingName)}
              />
          </div>
          <div>
              E-mail:
              <br />
              <input
                type="checkbox"
                checked={settingEmail}
                onChange={() => setSettingEmail(!settingEmail)}
              />
          </div>
          </div>
          <button type="submit">Save</button>
        </s.Form>
        <button onClick={handleLogOut}>log out</button>

        </>)}
      </s.Modal>
    </s.Container>
  );
}
