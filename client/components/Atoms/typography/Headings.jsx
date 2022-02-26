import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
text-align: center;
text-transform: lowercase;
font-size: 2.7em;
letter-spacing: -1.78px;
margin-bottom: 15px;
margin-top: 0;
color: ${props => props.color};`

const H2 = styled.h2``
const H3 = styled.h3`
font-size: 1.5em;
margin-bottom: 15px;
margin-top: 0;
color: ${props => props.color};`

const H4 = styled.h4``
const H5 = styled.h5``
const H6 = styled.h6``
const Paragraph = styled.p`
letter-spacing: 0.8px;
`

export {H1, H2, H3, H4, H5, H6, Paragraph}
