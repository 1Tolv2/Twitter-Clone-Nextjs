import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as s from "./styles";
import { UserContext } from "../../layouts/mainLayout";
import { API } from "../../API";

export default function MessageItem({ data }) {
  const { userData, setUserData } = useContext(UserContext);
  const [liked, setLiked] = useState(null);
  const [totalLikes, setTotalLikes] = useState(null);
  const [totalComments, setTotalComments] = useState(null);

  const date = new Date(data.item.published);
  const fullDate = `${date.getHours()}.${date.getMinutes()} - ${date.getFullYear()}.${
    date.getMonth() + 1 < 10 
    ? "0" + (date.getMonth() + 1) 
    : date.getMonth()
  }.${date.getDate() < 10 
    ? "0" + date.getDate() 
    : date.getDate()}`;

  const { item, modifiedMessage, user } = data;
  const router = useRouter();

  useEffect(() => {
    // if person logged in is in likes list, have heart red
    const token = localStorage.getItem("Token");
    if (token){
    item.likes.find((user) => user === userData.data.user._id)
      ? setLiked(true)
      : setLiked(false);}

    setTotalLikes(item.likes.length);
    setTotalComments(item.comments.length);
  }, [data]);

 async function handleOnLike(e) {
    const messageId = e.target.id;
    const token = localStorage.getItem("Token");
    if (token) {
      const res = await fetch(`${API}/messages/${messageId}/like`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok){
      const data = await res.json()
        setTotalLikes(data.updatedMessage.likes.length)
        setLiked(!liked)
}
    } else {
      router.push("/login");
    }
  }
  function handleOnComment() {
    console.log("comment");
  }
  return (
      <s.ListItem key={data.item._id}>
        <s.ProfileContainer>
          <Link href={`/${user.username}`}>
            <a><s.Image src={`${API}/${user.image}`} alt="profileImage" /></a>
          </Link>
          <div>
            <h4>
              {user.settings.name ? `${user.firstname} ${user.lastname}` : user.username}
            </h4>
            <Link href={`/${user.username}`}>
              <a><i>@{user.username}</i></a>
            </Link>
          </div>
        </s.ProfileContainer>
        <s.MessageContainer>{modifiedMessage}</s.MessageContainer>
        <hr />
        <s.InteractionContainer>
          
          <ul>
            <li onClick={handleOnLike} id={data.item._id}>
              <img
                src={
                  liked
                    ? "/heart-filled-svgrepo-com.svg"
                    : "/heart-svgrepo-com.svg"
                }
                alt="heart icon"
              />
              <span>{totalLikes}</span>
            </li>
            <li onClick={handleOnComment}>
              <img src="/chat-bubble-svgrepo-com.svg" alt="chat bubble icon" />
              <span>{totalComments}</span>
            </li>
          </ul>
          <span><i>{fullDate}</i></span>
        </s.InteractionContainer>
      </s.ListItem>
  );
}
