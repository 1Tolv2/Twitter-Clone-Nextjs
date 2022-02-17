import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
width: 100%;
margin-top: 20px;
padding: 15px;
border-radius: 30px;
border-style: none;
background-color: green;
color: white;
cursor: pointer;
`

export default function Button({children}) {
  return (
    <StyledButton>{children}</StyledButton>
  )
}
