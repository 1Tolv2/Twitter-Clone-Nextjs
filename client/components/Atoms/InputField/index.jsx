import React from "react";
import * as s from './styles'

export default function InputField({ type, id, value, setValue, placeholder, required }) {
  return (
    <s.InputField
      type={type}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
}
