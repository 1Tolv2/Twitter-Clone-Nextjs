import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "./API";
// import InputField from './InputField';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  height: 180px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  img {
    width: 70px;
  }
`;



const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 100px;
  font-size: 1.4em;
  border: none;
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
  const [author, setAuthor] = useState("Test");
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("");

  const placeholderList = ["Lay down the moos", "Moo to your hearts desire"];
  useEffect(() => {
    setPlaceholder(placeholderList[Math.floor(Math.random() * 2)]);
  }, []);
  async function handleOnSubmit(e) {
    setAuthor("test");
    e.preventDefault();
    console.log("Submit handled");
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, message }),
    });
    console.log(res);
  }

  return (
    <StyledContainer>
      <img src="./Stylized-Cow-Line-Art.svg" />
      <form onSubmit={handleOnSubmit}>
        <StyledTextArea
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder + "..."}
          maxlength="140"
        />
        <StyledButtonContainer onClick={handleOnSubmit}>
          <img src="./send-paper.svg" />
          <StyledButton></StyledButton>
        </StyledButtonContainer>
      </form>
    </StyledContainer>
  );
}
