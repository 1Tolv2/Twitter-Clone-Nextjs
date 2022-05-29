import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 3px;
  background-color: #c5c5c5;
  hr {
    border: none;
    height: 1px;
    background-color: lightgrey;
  }
  h3 {
    font-size: 1.4em;
    margin: 10px 5px;
    color: white;
    text-transform: uppercase;
  }

  div {
    background-color: white;
    padding: 15px 10px;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    ul {
      padding-left: 9px;
      font-size: 1.1em;
      a {
        color: #6600ff;
        font-weight: 600;
      }
    }
  }
`;

export {Container}