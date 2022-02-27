import React from 'react';
// import {Heading1} from './typography/Headings'
import styled from 'styled-components';

const Heading1 = styled.h1`
text-align: center;
text-transform: lowercase;
font-size: 2.7em;
letter-spacing: -1.78px;
margin-bottom: 15px;
margin-top: 0;
color: ${props => props.color};`

export default function Header({children, color}) {
  return (
    <Heading1 color={color}>{children}</Heading1>
  )
}
