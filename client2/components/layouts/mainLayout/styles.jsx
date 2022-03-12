import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {background-color: #eeeeee;}
`

const Wrapper = styled.div`
  margin: auto;

  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 540px 300px;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
`;

export {GlobalStyle, Wrapper}