import React, { useState } from "react";
import { useRouter } from "next/router";
import AnimatedAddButton from "../../molecules/AnimatedAddButton";
import {postMessage} from '../../API'
import * as s from "./styles";

export default function MessageModal() {
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [iconState, setIconState] = useState("close");
  const [message, setMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [hashtagList, setHashtagList] = useState([]);
  const router = useRouter()


  function toggleIcon() {
    setModal(!modal);
    modal ? setIconState("close") : setIconState("open");
    // setErrorMessage(null)
  }
  function toggleOffModal() {
    setModal(false);
    setIconState("close")
  }

  let list = [];
  function handleMessageOnChange(e) {
    setMessage(e.target.value);
    setMessageLength(e.target.value.length);
    list = [...new Set(e.target.value.match(/#{1}[A-Ö]+/gi))];
    list && setHashtagList(list);
  }

  function handleOnClick(e) {
    e.preventDefault()
    const token = localStorage.getItem("Token")
    const payload = {message}
    postMessage(token, payload)
    router.reload(window.location.pathname)
  }
  return (
    <>
      <AnimatedAddButton phone
        data={{ toggleIcon, iconState }}
        position={{ top: "80vh", left: "10vw" }}
      ></AnimatedAddButton>
      {!modal && <s.MessageButton onClick={toggleIcon}><img src="/edit-svgrepo-com.svg"/>Message</s.MessageButton>}
      {modal && (
        <s.Container>
          <s.MessageContainer>
            <form>
              <textarea
                type="text"
                name="message"
                value={message}
                required
                onChange={handleMessageOnChange}
                placeholder="Write here..."
                maxlength="140"
              ></textarea>
              <span className={messageLength > 140 ? "redText" : null}>
                {messageLength}
              </span>
              <button onClick={handleOnClick}>
                <img src="/send-svgrepo-com.svg" />
              </button>
            </form>
          </s.MessageContainer>
          <s.BlackOutContainer onClick={toggleOffModal}></s.BlackOutContainer>
        </s.Container>
      )}
    </>
  );
}
