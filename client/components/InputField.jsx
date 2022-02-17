import React from "react";
import styled from "styled-components";

const StyledInputField = styled.input`
width: 100%;
border: none;
border-bottom: 1px solid grey;
height: 15px;
margin: 5px 0;
background-color: transparent;
&[type=text]:focus {
  border: none;
  background-color: lightgrey;
  &::placeholder { color: white;}
}
`;

export default function InputField({ type, id, value, setValue, placeholder }) {
  return (
    <StyledInputField
      type={type}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
}
