import React from "react";
import Link from 'next/link'
import * as s from './styles'
export default function BottomNavigationBar() {
  return (
    <s.Container>
      <ul>
        <li><Link href="/hashtags"><s.Icons src='/hashtag-svgrepo-com.svg'/></Link></li>
        <li><Link href="/"><s.Icons src='/home-svgrepo-com.svg'/></Link></li>
        <li><Link href="/user"><s.Icons src='/person-svgrepo-com.svg'/></Link></li>
      </ul>
    </s.Container>
  );
}
