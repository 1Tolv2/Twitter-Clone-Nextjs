import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
background-color: white;
width: 100%;
height: fit-content;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
`

const StyledHeader = styled.h2`
margin: 0 10px;
`

export default function ProfileSection({data}) {
    console.log(data)
  return (
    <StyledContainer>
        {data && <>
        <StyledHeader>{data.username}</StyledHeader>
        </>}
    </StyledContainer>
  )
}
