import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
`;

const Fade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.4;
  z-index: 6;
`;
const Modal = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 350px;
  min-height: 65px;
  padding: 30px 20px;
  background-color: white;
  z-index: 7;
  box-shadow: 0 0 15px #5f5f5f;
  p {
    text-align: center;
    cursor: pointer;
  }
  @media (min-width: 1025px) {
    padding: 50px 20px;
  }
`;

const Form = styled.form`
span {
  margin-top: 7px;
}
  div {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: row;
    }
  }
  input {
    color: grey;
    padding: 5px;
    margin: 5px;

    &[type="text"] {
      width: 100%;
      border: none;
      border-bottom: solid 1px grey;
    }
    &[type="file"] {
      width: 95px;
      border: none;
      border-bottom: solid 1px grey;
    }
  }
`;

export { Container, Fade, Modal, Form };
