import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: white;
`;

const Wrapper = styled.div`
width:100%;
max-width: 860px;
margin: auto;
  h1 {
    margin-bottom: 9px;
  }
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 540px 300px;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
  }
`

const Navigation = styled.div`
  display: none;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  @media (min-width: 1025px) {
    display: block;
    width: 150px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
`;

const Icons = styled.img`
  height: 30px;
  margin-top: 1px;
  cursor: pointer;
`;
export { Container, Wrapper, Navigation, Icons };
