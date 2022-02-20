import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "./API";
import MessageForm from "./MessageForm";

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  box-shadow: 2px 2px 15px #007599;
  display: grid;
  grid-template-columns: 100px auto;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  img {
    width: 70px;
  }
  span {
    &.redText {
      color: red;
    }
  }
`;

export default function MessageMaker() {
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [hashtagList, setHashtagList] = useState([]);

  const placeholderList = ["Lay down the moos", "Moo to your hearts desire"];

  useEffect(() => {
    setPlaceholder(placeholderList[Math.floor(Math.random() * 2)]);
  }, []);
  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log("Submit handled");
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: "Test", message }),
    });
    if (!res.ok) {
      const data = await res.json();
      console.log(data.errorMessage);
    }
    setMessage(""); //Empties the message field after submitting the message
    setMessageLength(0);
  }
  let list = [];
  function handleMessageOnChange(e) {
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
      list = [...new Set(message.match(/#{1}[A-Ö]+(?=\s|$)/gi))];
      list && setHashtagList(list);
      console.log(hashtagList);
  }

  function handleOnClick(e) {
    e.target.style.height = "115px";
  }

  return (
    <StyledContainer>
      <img src="./Stylized-Cow-Line-Art.svg" />
      <MessageForm data={handleOnSubmit, handleOnClick, handleMessageOnChange, message, placeholder, messageLength, hashtagList}/>
    </StyledContainer>
  );
}
