import React,{useState} from 'react'
import AnimatedAddButton from '../../molecules/AnimatedAddButton'
import * as s from './styles'

export default function MessageModal() {
  const [modal, setModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
    const [iconState, setIconState] = useState("close")

    function toggleIcon() {
        setModal(!modal);
        // loginForm ? setIconState("close") : setIconState("open");
        // setErrorMessage(null)
      }
  return (
    <s.Container>
        <AnimatedAddButton data={{toggleIcon, iconState}} position={{top: "80vh", left: "10vw"}}></AnimatedAddButton>
    {modal && (<><s.MessageContainer>
      <form>
        <textarea placeholder='Write here...'></textarea>
        <button><img src="/send-svgrepo-com.svg"/></button>
      </form>
    </s.MessageContainer>
    <s.BlackOutContainer></s.BlackOutContainer></>)}

    </s.Container>
  )
}
