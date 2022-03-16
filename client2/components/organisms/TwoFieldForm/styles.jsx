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
  overflow:hidden;
  input {
    background-color: transparent;
  }
  p {
    color: red;
  }
`;
const PrimaryContainer = styled.div`
  position: relative;
  margin: 30px 5px;
  transition: opacity 0.6s;
  &.open {
    opacity: 0;
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
  transition: 0.4s ease-in-out;
  &:hover {
    color: #326cd3;
    background-color: white;
    border-color: #326cd3;
  }
`;

const IconButton = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 60px;
  height: 60px;
  background-color: #326cd3;
  border-radius: 50px;
  cursor: pointer;
  z-index: 10;
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
  cursor: pointer;

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
    background-color: #4bf3ff;
  }
  &.open {
    transform: rotate(-45deg);
    background-color: #4bf3ff;
  }
`;

const HiddenContainer = styled.div`
  position: absolute;
  display: none;
  top: 0;
  left: 20px;
  width: 250px;
  margin: 30px 5px;
  z-index: 6;
  transition: 0.5s;
  h2 {
    color: white;
  }
  input {
    color: white;
    background-color: transparent;
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
    background-color: transparent;
    border-color: white;
    padding: 2px;
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

const BackgroundAnimation = styled.div`
position: relative;
top: 30px;
left: 230px;
background-color: #326cd3;
/* background-color: yellow; */

border-radius: 500px;
height: 20px;
width: 20px;
z-index: -5;
transition: transform 1s ease-in;
&.open {
  transform: scale(40);
}
`
export { Wrapper, PrimaryContainer, Button, IconButton, Icon, HiddenContainer,BackgroundAnimation };
