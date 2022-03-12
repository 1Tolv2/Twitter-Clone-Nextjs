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
  width: 80%;
  max-width: 600px;
  height: fit-content;
  min-height: 65px;
  padding: 10px 15px;
  background-color: white;
  z-index: 7;
  box-shadow: 0 0 15px #5f5f5f;
`;

export {Container, Fade, Modal}