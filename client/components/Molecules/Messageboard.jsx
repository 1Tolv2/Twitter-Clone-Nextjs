import React from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";

const StyledWrapper = styled.div`
  width: 100%;
`;

export default function Messageboard({ data, children, userData }) {
  return (
    <div>
      {children}
      <StyledWrapper>
        {data && userData &&
          data.map((item) => {
            return (
            <MessageItem key={item._id} data={item} userData={userData.find((user) => user.username === item.username)}></MessageItem>
            );
          })}
      </StyledWrapper>
    </div>
  );
}
