import styled, {css} from "styled-components";

const Container = styled.div`
position: relative;
  display: none;

  @media (min-width: 1025px) {
    display: block;
  }
`;

export { Container };
