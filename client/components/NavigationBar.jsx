import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.nav`
display: flex;
justify-self: end;
outline: 2px purple solid;
flex-flow: wrap row;
height: 100%;
justify-content: center;
`
const StyledLogo = styled.div`
max-width: 170px;
height: auto;
img {width: 100%;
  height: auto;}
`
const StyledButton = styled.button`
width: 100%;
padding: 15px;
border-radius: 30px;
border-style: none;
background-color: green;
color: white;
`

const StyledList = styled.ul`
list-style-type: none;
padding: 0;
`

export default function NavigationBar() {
  return (
    <StyledContainer>
      <StyledLogo><img src="./Flying-cow.svg"/></StyledLogo>
      <StyledList>
      <li>Home</li>
      <li>Profile</li>
      <li>Log out</li>
      <li>More</li>
      </StyledList>
      <StyledButton>Moo</StyledButton>
      </StyledContainer>
  )
}
