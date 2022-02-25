import React from "react";
import styled from "styled-components";

import MessageForm from "./MessageForm";

const StyledContainer = styled.div`
  position: sticky;
  top: 0;
  box-shadow: 2px 2px 15px #007599;
  display: grid;
  grid-template-columns: 100px auto;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  img {
    width: 70px;
  }
  span {
    &.redText {
      color: red;
    }
  }
`;

export default function MessageMaker() {

  return (
    <StyledContainer>
      <img src="./Stylized-Cow-Line-Art.svg" />
      <MessageForm />
    </StyledContainer>
  );
}
