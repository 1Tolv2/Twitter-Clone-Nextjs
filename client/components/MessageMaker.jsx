import React, {useState} from 'react'
import styled from 'styled-components';
import InputField from './InputField';

const StyledContainer = styled.div`
padding: 20px;
`

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  -ms-overflow-style: none; // for Internet Explorer, Edge
  scrollbar-width: none; // for Firefox
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // for Chrome, Safari, and Opera
  }
`;

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
    <form onSubmit={handleOnSubmit}>
      Moo to your hearts desire
      <StyledTextArea
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={}
      />
      <StyledButton type="submit">S</StyledButton>
    </form>
  </StyledContainer>
  )
}
