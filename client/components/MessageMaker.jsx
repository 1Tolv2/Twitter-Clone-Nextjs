import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "./API";
import HashtagList from "./HashtagList";

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

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 40px;
  font-size: 1.4em;
  border: none;
  transition: 0.4s;
  -ms-overflow-style: none; // for Internet Explorer, Edge
  scrollbar-width: none; // for Firefox
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // for Chrome, Safari, and Opera
  }
  &:focus {
    outline: none;
  }
`;

const StyledButtonContainer = styled.div`
  position: relative;
  float: right;
  img {
    position: absolute;
    top: 7px;
    left: 15px;
    width: 25px;
    cursor: pointer;
  }
`;
const StyledButton = styled.button`
  width: 60px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background-color: #00afb9;
  color: white;
  cursor: pointer;
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
      list = [...new Set(message.match(/#{1}[A-Ö]+(?:\s|$)/gi))];
      list && setHashtagList(list);
      console.log(hashtagList);
  }

  function handleOnClick(e) {
    e.target.style.height = "115px";
  }

  return (
    <StyledContainer>
      <img src="./Stylized-Cow-Line-Art.svg" />
      <form onSubmit={handleOnSubmit}>
        <StyledTextArea
          onClick={handleOnClick}
          type="text"
          name="message"
          value={message}
          required
          onChange={handleMessageOnChange}
          placeholder={placeholder + "..."}
          maxlength="140"
        />
        <StyledButtonContainer onClick={handleOnSubmit}>
          <img src="./send-paper.svg" />
          <StyledButton></StyledButton>
        </StyledButtonContainer>
        <span className={messageLength > 140 ? "redText" : null}>
          {messageLength}
        </span>
        <HashtagList data={hashtagList}></HashtagList>
      </form>
    </StyledContainer>
  );
}
