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
    margin: 0 10px;
    width: fit-content;
  }
  hr{
    height: 3px;
    background-color: #00AFB9;
  }
`;

const MessageInfoField = styled.div`
display: flex;
justify-content: space-between;
`

export default function MessageItem({data}) {
  const date = new Date(data.date)
  const fullDate = `${date.getFullYear()}.${(date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : date.getMonth()}.${date.getDate()}`
  console.log(date)
  return (
    <StyledSection key={data._id}>
      <Link href={`/${data.author}`}>
        <StyledImage>
          <img src="profile-svgrepo-com.svg" height="50px" />
        </StyledImage>
      </Link>
      <StyledContainer>
        <MessageInfoField>
          <h3>
            <Link href={`/${data.author}`}>{data.author}</Link>
          </h3><span>{fullDate}</span>
        </MessageInfoField>
        <hr />
        <p>{data.message}</p>
      </StyledContainer>
    </StyledSection>
  );
}