import React from 'react'
import styled from 'styled-components'

const StyledParagraph = styled.p`
color: red;
font-weight: bold;
margin-bottom: 0;
`

export default function RedParagraph({children}) {
  return (
    <StyledParagraph>{children}</StyledParagraph>
  )
}
