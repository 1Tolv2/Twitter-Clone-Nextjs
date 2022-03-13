import styled, {css} from "styled-components";

const Container = styled.div`
position: relative;
  display: none;

  @media (min-width: 1025px) {
    display: block;
  }
`;

const ContainerStyle = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const ProfileContainer = styled(ContainerStyle)`
  background-image: linear-gradient(190deg, #00ffcc, #5600d8);
  padding: 15px 10px;

  ${props => props.button && css`
  &:hover {
    opacity: 0.7;
  }
  `}
`;

const Image = styled.img`
    display: block;
    width: 130px;
    height: auto;
    border: solid 3px white;
    border-radius: 100px;
    margin: auto;
`

const Header = styled.h2`
    color: white;
    margin-top: 5px;
    margin-bottom: 0;
    text-align: center;
`

const EditButton = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
img {
  pointer-events: none;
}
`

export { Container, ProfileContainer, Image, Header, EditButton };
