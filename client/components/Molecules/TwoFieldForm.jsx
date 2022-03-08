import React from 'react'
import InputField from "../atoms/InputField";
import Button from '../atoms/Button';
import RedParagraph from '../atoms/RedParagraph';

export default function TwoFieldForm({handleOnSubmit, states, errorMessage, buttonText}) {
  return (
    <form onSubmit={handleOnSubmit}>
        <InputField
          type="text"
          id="username"
          value={states.username}
          setValue={states.setUsername}
          placeholder="Username"
          required
        />
        <InputField
          type="password"
          id="password"
          value={states.password}
          setValue={states.setPassword}
          placeholder="Password"
          required
        />
        {errorMessage && <RedParagraph>{errorMessage}</RedParagraph>}
        <Button type="submit">{buttonText}</Button>
      </form>
  )
}
