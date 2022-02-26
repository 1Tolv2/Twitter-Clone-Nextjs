import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { H3, Paragraph } from "../Atoms/typography/Headings";

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
  const date = new Date(data.published)
  const fullDate = `${date.getFullYear()}.${(date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : date.getMonth()}.${date.getDate()}`
  console.log(date)
  return (
    <StyledSection key={data._id}>
      <Link href={`/${data.username}`}>
        <a>
          <StyledImage>
            <img src="profile-svgrepo-com.svg" height="50px" />
          </StyledImage>
        </a>
      </Link>
      <StyledContainer>
        <MessageInfoField>
          <H3>
            <Link href={`/${data.username}`}><a>{data.username}</a></Link>
          </H3><span>{fullDate}</span>
        </MessageInfoField>
        <hr />
        <Paragraph>{data.message}</Paragraph>
      </StyledContainer>
    </StyledSection>
  );
}
