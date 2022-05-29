import styled from "styled-components";

const Button = styled.button`
font-size: 1.1em;
font-weight: 600;
width: ${props => props.width};
height: 50px;
border-radius: 50px;
border: none;
color: white;
margin-top: 25px;
cursor: pointer;
background-image: ${props => props.color ? props.color : "linear-gradient(135deg, #ff2994, #29c2ff)"};
`

 export {Button}