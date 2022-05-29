import styled from "styled-components";

const InputField = styled.input`
display: block;
width: 100%;
border: none;
margin: 5px 0;
padding: 9px 10px 9px 13px;
background-color: white;
font-size: 1.1rem;
border-radius: 5px;
&[type=text]:focus {
  outline: solid 2px#ccc;
  &::placeholder { color: grey;}
}
`;

export {InputField}