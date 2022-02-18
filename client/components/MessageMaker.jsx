import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {API} from "./API"
// import InputField from './InputField';

const StyledContainer = styled.div`
display: grid;
grid-template-columns: 100px auto;
padding: 20px;
img {
  width: 70px;
}
`

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 95px;
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
img {
  position:absolute;
  top: 5px;
  left: 12px;
  width: 30px;
}
`
const StyledButton = styled.button`
width: 60px;
height: 40px;
border-radius: 20px;
border: none;
background-color: #00AFB9;
color: white;
`

export default function MessageMaker() {    
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [placeholder, setPlaceholder] = useState("")

    const placeholderList = ["Lay down the moos", "Moo to your hearts desire"]
    useEffect(() => {
        setPlaceholder(placeholderList[Math.floor(Math.random() * 2)])
    }, [])
    async function handleOnSubmit(e) {
        setAuthor("test")
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
      <img src="./Stylized-Cow-Line-Art.svg"/>
    <form onSubmit={handleOnSubmit}>
      <StyledTextArea
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder + "..."}
        maxlength="140"
      />
      <StyledButtonContainer>
        <img src="./send-paper.svg"/>
        <StyledButton type="submit"></StyledButton>
      </StyledButtonContainer>
    </form>
  </StyledContainer>
  )
}
