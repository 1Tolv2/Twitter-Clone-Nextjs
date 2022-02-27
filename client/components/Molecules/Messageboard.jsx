import React from "react";
import styled from "styled-components";
import MessageItem from "./MessageItem";

const StyledWrapper = styled.div`
  width: 100%;
`;

export default function Messageboard({ data, children }) {
  return (
    <div>
      {children}
      <StyledWrapper>
        {data &&
          data.map((item) => {
            return (
            <MessageItem key={item._id} data={item}></MessageItem>
            );
          })}
      </StyledWrapper>
    </div>
  );
}
