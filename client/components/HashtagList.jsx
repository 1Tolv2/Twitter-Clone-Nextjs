import React from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  max-width: 250px;
`;
const StyledListItem = styled.li`
  margin: 0 5px;
  text-transform: lowercase;
  color: #f07167;
`;
export default function HashtagList({ data }) {
  console.log("ITEMList:", data);
  return (
    <StyledList>
      {data &&
        data.map((item, index) => {
          return <StyledListItem key={index}>{item}</StyledListItem>;
        })}
    </StyledList>
  );
}
