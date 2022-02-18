import React from "react";
import Link from "next/link";
import styled from "styled-components";
import MessageMaker from "./MessageMaker";

const StyledContainer = styled.div`

`;

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  -ms-overflow-style: none; // for Internet Explorer, Edge
  scrollbar-width: none; // for Firefox
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // for Chrome, Safari, and Opera
  }
`;

export default function Messageboard({ data }) {

  return (
    <div>
<MessageMaker/>
      <div>
        {data &&
          data.map((item) => {
            return (
              <article key={item._id}>
                <Link href={`/${item.author}`}>{item.author}</Link> -{" "}
                {item.message}
              </article>
            );
          })}
      </div>
    </div>
  );
}
