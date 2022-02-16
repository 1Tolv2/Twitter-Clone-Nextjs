import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
display: flex;
justify-self: end;
outline: 2px purple solid;
flex-flow: wrap row;
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

export default function NavigationBar() {
  return (
    <StyledContainer>
      <StyledLogo><img src="./Flying-cow.svg"/></StyledLogo>
      <ul>
      <li>Home</li>
      <li>Explore</li>
      <li>Notifications</li>
      <li>Messages</li>
      <li>Profile</li>
      <li>More</li>
      </ul>
      <StyledButton>Moo</StyledButton></StyledContainer>
  )
}
