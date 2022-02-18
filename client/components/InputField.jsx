import React from "react";
import styled from "styled-components";

const StyledInputField = styled.input`
display: block;
width: 100%;
border: none;
margin: 5px 0;
padding: 11px 10px 11px 13px;
background-color: white;
font-size: 1.1rem;
border-radius: 5px;
&[type=text]:focus {
  outline: none;
  &::placeholder { color: grey;}
}
`;

export default function InputField({ type, id, value, setValue, placeholder, required }) {
  return (
    <StyledInputField
      type={type}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
}
