import React from "react";
import Link from "next/link";
import * as s from "./styles";
import * as t from "../../atoms/typography/Headings";

export default function Header() {
  return (
    <s.Container>
      <s.Wrapper>
        <t.H1>Twooter</t.H1>
        <s.Navigation>
          <ul>
            <li>
              <Link href="/">
                <s.Icons src="/home-black-svgrepo-com.svg" />
              </Link>
            </li>
          </ul>
        </s.Navigation>
      </s.Wrapper>
    </s.Container>
  );
}
