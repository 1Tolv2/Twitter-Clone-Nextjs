import React from 'react'
import styled from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  outline: 2px solid red;
`;

export default function Grid({children}) {
  return (<StyledGrid>
    {children}
    </StyledGrid>
  )
}
