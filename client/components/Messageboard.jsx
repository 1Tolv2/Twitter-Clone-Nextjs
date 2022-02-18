import React from "react";
import Link from "next/link";
import MessageMaker from "./MessageMaker";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
`;
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

export default function Messageboard({ data, children }) {
  return (
    <div>
      {children}
      <StyledWrapper>
        {data &&
          data.map((item) => {
            return (
              <StyledSection key={item._id}>
                <Link href={`/${item.author}`}>
                  <StyledImage>
                    <img src="profile-svgrepo-com.svg" height="50px" />
                  </StyledImage>
                </Link>
                <StyledContainer>
                  <h3>
                    <Link href={`/${item.author}`}>{item.author}</Link>
                  </h3>
                  <hr />
                  <p>{item.message}</p>
                </StyledContainer>
              </StyledSection>
            );
          })}
      </StyledWrapper>
    </div>
  );
}
