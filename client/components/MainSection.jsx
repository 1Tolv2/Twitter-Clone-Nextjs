import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.main`
max-width: 600px;
height: 100vh;
outline: 2px solid purple;
`
const StyledHeader = styled.div`
outline: 2px solid green;
h3 {
margin-top: 0;}
`
const OutlinedContainer = styled.div`
outline: 2px solid green;
`

export default function MainSection({children}) {
  return (
    <StyledContainer>
      <StyledHeader><h3>Mooer</h3></StyledHeader>
      <OutlinedContainer>Lay down the moos</OutlinedContainer>
      <OutlinedContainer>{children}</OutlinedContainer>
    </StyledContainer>
  )
}
