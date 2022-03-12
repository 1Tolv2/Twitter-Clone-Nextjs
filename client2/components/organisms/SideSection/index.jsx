import React, { useState, useEffect, useContext } from "react";
import * as s from "./styles";
import Link from "next/link";
import { API } from "../../API";
import { UserContext } from "../../../pages";

export default function SideSection() {
  const [user, setUser] = useState(null);
  const { userData } = useContext(UserContext);
  const [trendingList, setTrendingList] = useState(null);
  const [discoverList, setDiscoverList] = useState([]);

  useEffect(() => {
    userData && setUser(userData.data?.user);
  }, [userData]);

  useEffect(() => {
    fetch(`${API}/hashtags?limit=5`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ data }) => setTrendingList(data));
  }, []);

  useEffect(() => {
    fetch(`${API}/users`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        let list = [];
        for (let i = 0; i < 5; i++) {
          const index = Math.floor(Math.random() * data.length);
          list.push(data[index]);
          data.splice(index, 1);
          
        }
        setDiscoverList(list);
      });
  }, []);

  return (
    <s.Container>
      {user && (
        <s.ProfileContainer>
          <img src={`${API}/${user.image}`} alt="profile image" />
          <h2>Hello {user.username}!</h2>
        </s.ProfileContainer>
      )}
      <s.FollowContainer>
        <h3>TRENDING</h3>
        <div>
          <ul>
            {trendingList &&
              trendingList.map((tag, index) => (
                <li key={index}>
                  {console.log(tag.tag_name.replace("#", "%23"))}
                  <Link href={`/hashtags/${tag.tag_name.replace("#", "%23")}`}>
                    <a>{tag.tag_name}</a>
                  </Link>
                  <i> - {tag.count}</i>
                </li>
              ))}
          </ul>
        </div>
      </s.FollowContainer>
      <s.HashtagContainer>
        <h3>DISCOVER</h3>
        <div>
          <ul>
            {discoverList.map((user, index) => (
              <li key={index}>
                <Link href={`/${user.username}`}>
                  <a>{user.username}</a>
                </Link>
                {console.log(user)}
                {user.settings.name ? (
                  <i>{` - ${user.firstname} ${user.lastname}`}</i>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </s.HashtagContainer>
    </s.Container>
  );
}
