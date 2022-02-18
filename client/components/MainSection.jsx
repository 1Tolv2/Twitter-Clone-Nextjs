import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const StyledContainer = styled.main`
max-width: 600px;
height: 100vh;
hr {
  background-color: white;
  border-color: white;
  border-style: solid;
}
`

export default function MainSection({children}) {
  return (
    <StyledContainer>
      <Header color="white">Welcome to Mooer</Header> {/* Add user name if logged in */}
      <hr/>
      <div>{children}</div>
    </StyledContainer>
  )
}
