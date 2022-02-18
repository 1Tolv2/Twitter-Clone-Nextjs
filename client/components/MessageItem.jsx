import React from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledSection = styled.article`
  margin: 15px 0;
  display: grid;
  gap: 15px;
  grid-template-columns: 60px auto;
`;
const StyledImage = styled.div`
  width: 100%;
  height: 60px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;
const StyledContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  overflow-x: hidden;
  h3 {
    margin: 0;
  }
`;

export default function MessageItem({data}) {
  return (
    <StyledSection>
      <Link href={`/${data.author}`}>
        <StyledImage>
          <img src="profile-svgrepo-com.svg" height="50px" />
        </StyledImage>
      </Link>
      <StyledContainer>
        <h3>
          <Link href={`/${data.author}`}>{data.author}</Link>
        </h3>
        <hr />
        <p>{data.message}</p>
      </StyledContainer>
    </StyledSection>
  );
}
