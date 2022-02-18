import React from 'react'
import styled from 'styled-components'

const StyledGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 70% auto;
  gap: 10px;
`;

export default function Grid({children}) {
  return (<StyledGrid>
    {children}
    </StyledGrid>
  )
}
