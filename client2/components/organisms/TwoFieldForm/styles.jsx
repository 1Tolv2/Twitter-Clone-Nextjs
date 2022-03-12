import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 350px;
  width: 300px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  transition: 0.5s;
  box-shadow: 3px 3px 30px #2e334d;
  &.open {
    background-color: #326cd3;
  }
  p {
    color: red;
  }
`;
const PrimaryContainer = styled.div`
  position: relative;
  margin: 30px 5px;
  &.open {
    display: none;
  }
`;

const Button = styled.button`
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 600;
  height: 40px;
  width: 100%;
  color: white;
  background-color: #00d9ff;
  border: solid 3px #00d9ff;
  margin-top: 30px;
  transition: 0.2s;
  /* box-shadow: 0px 3px 8px darkgrey; */
  &:hover {
    color: #326cd3;
    background-color: white;
    border-color: #326cd3;
  }
`;

const IconButton = styled.div`
  position: absolute;
  top: 30px;
  right: -20px;
  width: 60px;
  height: 60px;
  background-color: #326cd3;
  border-radius: 50px;
  cursor: pointer;
  &.open {
    background-color: #4bf3ff;
    box-shadow: 0px 0px 15px #3a4061;

  }
  z-index: 3;
`;

const Icon = styled.div`
  position: absolute;
  top: 28px;
  left: 15px;
  background-color: white;
  width: 30px;
  height: 4px;
  border-radius: 5px;
  transform: rotate(90deg);
  pointer-events: none;
  transition: 0.4s ease-in-out;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    width: 30px;
    height: 4px;
    border-radius: 5px;
    transform: rotate(90deg);
    pointer-events: none;
    transition: 0.4s ease-in-out;
  }
  &.open::before {
    transform: rotate(-90deg);
    background-color: #326cd3;
  }
  &.open {
    transform: rotate(-45deg);
    background-color: #326cd3;
  }
`;

const HiddenContainer = styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: 20px;
  width: 250px;
  margin: 30px 5px;
  z-index: 2;
  transition: 0.5s;
  h2 {
    color: white;
  }
  input {
    color: white;
    background-color: #326cd3;
    &::placeholder {
      color: white;
    }
    &[type="text"]:focus,
    &[type="password"]:focus {
      outline: solid 2px white;
      &::placeholder {
        color: white;
      }
    }
  }
  button {
    color: #326cd3;
    background-color: white;
    border-color: white;
    padding: 2px;
    box-shadow: 0px 0px 15px #3a4061;
    &:hover {
    border-color: white;

      opacity: 0.6;
      cursor: pointer;
    }
  }
  &.open {
    display: block;
  }
`;
export { Wrapper, PrimaryContainer, Button, IconButton, Icon, HiddenContainer };
