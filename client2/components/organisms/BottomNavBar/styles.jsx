import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  color: white;
  background-color: black;
  background-image: linear-gradient(135deg,#00ffcc, #5600d8);
  @media (min-width: 1025px) {
    display: none;
  }
  ul {
    list-style: none;
    height: 100%; 
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    z-index: 2;
  }
`;

const Icons = styled.img`
height: 30px;
margin-top: 1px;
`

export {Container,Icons}