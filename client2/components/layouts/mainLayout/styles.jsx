import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {background-color: #f5f5f5;}
`

const Wrapper = styled.div`
  padding-top: 20px;
  width: 80%;
  max-width: 900px;
  margin: auto;
`;

export {GlobalStyle, Wrapper}