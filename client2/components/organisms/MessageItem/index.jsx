import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as s from "./styles";
import { UserContext } from "../../../pages/index";
import { API } from "../../API";

export default function MessageItem({ data }) {
  const { userData, setUserData } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(null);
  const [totalComments, setTotalComments] = useState(null);

  const { item, modifiedMessage, user } = data;
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    // if person logged in is in likes list, have heart red
    item.likes.find((user) => user === userData.data.user._id)
      ? setLiked(true)
      : setLiked(false);
    setTotalLikes(item.likes.length);
    setTotalComments(item.comments.length);
  }, [data]);

  function handleOnLike(e) {
    const messageId = e.target.parentNode.parentNode.id;
    const token = localStorage.getItem("Token");
    console.log(messageId);
    if (token) {
      fetch(`${API}/messages/${messageId}/like`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTotalLikes(data.updatedMessage.likes.length)
        setLiked(data.updatedMessage.likes.find((user) => user === userData.data.user._id ? "true": "false"))
        })

    } else {
      router.push("/login");
    }
  }
  function handleOnComment() {
    console.log("comment");
  }
  return (
    <>
      <s.ListItem key={data.item._id}>
        <s.ProfileContainer>
          <Link href={`/${user.username}`}>
            <s.Image src={`${API}/${user.image}`} alt="profileImage" />
          </Link>
          <div>
            <h4>
              {user.settings.name && `${user.firstname} ${user.lastname}`}
            </h4>
            <Link href={`/${user.username}`}>
              <i>@{user.username}</i>
            </Link>
          </div>
        </s.ProfileContainer>
        <s.MessageContainer>{modifiedMessage}</s.MessageContainer>
        <s.InteractionContainer>
          <hr />
          <ul id={data.item._id}>
            <li onClick={handleOnLike}>
              <img
                src={
                  liked
                    ? "/heart-svgrepo-com.svg"
                    : "/chat-bubble-svgrepo-com.svg"
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
        </s.InteractionContainer>
      </s.ListItem>
    </>
  );
}
