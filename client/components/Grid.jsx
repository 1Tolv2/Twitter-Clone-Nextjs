import React from 'react'
import styled from 'styled-components'

const StyledGrid = styled.div`
position: relative;
  display: grid;
  grid-template-columns: 20% auto auto;
  outline: 2px solid red;
  gap: 10px;
`;

export default function Grid({children}) {
  return (<StyledGrid>
    {children}
    </StyledGrid>
  )
}
