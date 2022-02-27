import React from 'react'
import styled from 'styled-components'
import Header from '../Atoms/Header'
import Link from 'next/link'

const StyledContainer = styled.main`
max-width: 600px;
height: 105%;
-ms-overflow-style: none; // for Internet Explorer, Edge
  scrollbar-width: none; // for Firefox
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; // for Chrome, Safari, and Opera
  }
hr {
  background-color: white;
  border-color: white;
  border-style: solid;
}
`

export default function MainSection({children}) {
  return (
    <StyledContainer>
      <Header color="white"><Link href="/">mooer</Link></Header>
      <hr/>
      <div>{children}</div>
    </StyledContainer>
  )
}
