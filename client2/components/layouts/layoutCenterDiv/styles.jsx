import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {background-color: #fed9b7;
background-image: linear-gradient(135deg,#00ffcc, #5600d8);}
`

const StyledWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const CenteredContainer = styled.div`
  position: absolute;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
`;

export {GlobalStyle, StyledWrapper, CenteredContainer}