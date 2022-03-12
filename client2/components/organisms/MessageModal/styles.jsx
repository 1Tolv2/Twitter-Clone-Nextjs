import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const BlackOutContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.4;
  z-index: 2;
`;
const MessageContainer = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  height: fit-content;
  min-height: 65px;
  padding: 10px 15px;
  background-color: white;
  z-index: 3;
  box-shadow: 0 0 15px #5f5f5f;
  form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    img {
      height: 40px;
    }
    textarea {
      font-size: 1.6em;
      resize: none;
      width: 70%;
      height: 1.7em;
      border: none;
      border-bottom: solid 1px grey;
      overflow: visible;
      &:focus {
        outline: none;
      }
    }
    button {
        border: none;
        background-color: transparent;
        img {
            margin-top: 3px;
        }
    }
  }
`;
export { Container, MessageContainer, BlackOutContainer };
