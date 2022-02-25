import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.h1`
text-align: center;
text-transform: lowercase;
font-size: 2.2em;
margin-bottom: 15px;
margin-top: 0;
color: ${props => props.color};
`

export default function Header({children, color}) {
  return (
    <StyledHeader color={color}>{children}</StyledHeader>
  )
}
