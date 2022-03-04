import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
width: ${({width}) => width ? width : 100}%;
margin-top: 20px;
padding: 15px;
border-radius: 30px;
border-style: none;
background-color: #00AFB9;
color: white;
cursor: pointer;
`

export default function Button({children, handleOnClick, width}) {
  return (
    <StyledButton onClick={handleOnClick} width={width}>{children}</StyledButton>
  )
}
