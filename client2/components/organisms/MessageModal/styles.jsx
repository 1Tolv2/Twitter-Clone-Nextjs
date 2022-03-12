import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
`;

const BlackOutContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.4;
  z-index: 4;
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
  z-index: 5;
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
    span {
        &.redText {
            color: red;
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

const MessageButton = styled.button`
display: none;
position: fixed;
bottom: 60px;
right: 20%;
width: 160px;
height: 50px;
border-radius: 50px;
font-size: 1.4em;
font-weight: 600;
color: white;
background-image: linear-gradient(135deg, #ff2994, #29c2ff);
border: none;
box-shadow: 0px 0px 10px grey;
z-index:1;
cursor: pointer;
img {
  height: 25px;
  width: auto;
  pointer-events: none;
}
@media (min-width: 1025px) {
display: flex;
justify-content: space-evenly;
align-items: center;
  }
`
export { Container, MessageContainer, BlackOutContainer, MessageButton };
