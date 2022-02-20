import React from 'react'
import styled from 'styled-components'
import HashtagList from "./HashtagList";


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

export default function MessageForm({handleOnSubmit, handleOnClick, handleMessageOnChange, message, placeholder, messageLength, hashtagList}) {
  return (
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
  )
}
