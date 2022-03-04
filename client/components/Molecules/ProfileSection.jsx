import React from "react";
import styled from "styled-components";
import { API } from "../API";
import Button from "../atoms/Button";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  gap: 20px;
  background-color: white;
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  img {
    width: 100%;
    height: auto;
  }
  ul{
    list-style: none;
    margin: 10px 0;
    padding: 0;
    li{
      span {
        margin: 0 5px;
      }
    }
  }
`;

const StyledHeader = styled.h2`
  margin: 0 10px;
`;

export default function ProfileSection({ data }) {
  function handleOnClick() {
    
  }
  return (
    <StyledContainer>
      {data && (
        <>
          <div>
            <img src={`${API}/${data.image}`} />
          </div>
          <div>
            <StyledHeader>{data.username}</StyledHeader>
            <ul>
              {data.settings.name && <li>{data.name}</li>}
              {data.settings.email && <li>{data.email}</li>}
              <li>
                <span>Followers: {data.subscribers.length}</span>
                <span>Following: {data.subscribedTo.length}</span>
              </li>
              <li>
                <Button width="25" handleOnClick={handleOnClick}>Follow</Button>
              </li>
            </ul>
          </div>
        </>
      )}
    </StyledContainer>
  );
}
