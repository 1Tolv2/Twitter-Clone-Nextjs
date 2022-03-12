import styled from "styled-components";

const IconButton = styled.div`
  position: fixed;
  top: ${props => props.position.top};
  right: ${props => props.position.left};
  width: 60px;
  height: 60px;
  background-color: #326cd3;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 0px 10px #5d648a;
  &.open {
    background-color: #4bf3ff;
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

export {IconButton, Icon}