import React from 'react'
import styled from 'styled-components'
import Button from "./Button"

const StyledContainer = styled.div`
display: flex;
justify-content: center;
align-content: flex-start;
flex-flow: wrap row;
justify-self: start;
width: 100%;
background-color: #FDFCDC;
border-radius: 5px;
padding: 20px;
text-align: center;
button{ background-color: #F07167;}
h2 {
  height: fit-content;
}
`

const StyledList = styled.ul`
list-style-type: none;
padding: 0;
`


export default function SideSection() {
  return (
    <StyledContainer><h2>Hello User!</h2>
    <StyledList>
    <li>Settings</li>
    <Button>Log out</Button>
    </StyledList></StyledContainer>
  )
}
