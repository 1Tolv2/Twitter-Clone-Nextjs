import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.h1`
text-align: center;
text-transform: lowercase;
font-size: 2.2em;
margin-bottom: 15px;
margin-top: 0;
`

export default function Header({children}) {
  return (
    <StyledHeader>{children}</StyledHeader>
  )
}
