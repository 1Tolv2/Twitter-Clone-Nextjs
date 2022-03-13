import React, { useState, useEffect, useContext } from "react";
import * as s from "./styles";
import Link from "next/link";
import { API } from "../../API";
import { UserContext } from "../../layouts/mainLayout";
import UserWidget from "../../molecules/UserWidget";
import SideWidget from "../../molecules/SideWidget";

export default function SideSection({ modal }) {
  const [user, setUser] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    userData && setUser(userData.data?.user);
  }, [userData]);

  function toggleEditModal() {
    modal.setEditModal(!modal.editModal);
  }

  return (
    <s.Container>
      {user && (
        <>
          <UserWidget onClick={toggleEditModal}></UserWidget>
          <SideWidget type="hashtags" title="trending"></SideWidget>
          <SideWidget type="users" title="discover"></SideWidget>
        </>
      )}
    </s.Container>
  );
}
