import React, { useState, useEffect, useContext } from "react";
import * as s from "./styles";
import Link from "next/link";
import { API } from "../../API";
import { UserContext } from "../../layouts/mainLayout";

export default function UserWidget({onClick}) {
    const [user, setUser] = useState(null);
    const { userData } = useContext(UserContext);

    function upperCaseName(name) {
        const modifiedName = name.replace(name[0], name[0].toUpperCase());
        return modifiedName;
      }
    useEffect(() => {
        userData && setUser(userData.data?.user);
      }, [userData]);
  return (<>
        {user ? (<>
        <s.EditButton onClick={onClick}><img src="/gear-svgrepo-com.svg"/></s.EditButton>
        <s.ProfileContainer>
          <Link href={`/${user.username}`}><a><s.Image src={`${API}/${user.image}`} alt="profile image" /></a></Link>
          <s.Header>Hello <Link href={`/${user.username}`}><a>{upperCaseName(user.username)}</a></Link>!</s.Header>
        </s.ProfileContainer></>
      ) : (
        <Link href="/login">
          <a>
            <s.ProfileContainer button>
              <s.Header>Sign in</s.Header>
            </s.ProfileContainer>
          </a>
        </Link>
      )}</>
  )
}
