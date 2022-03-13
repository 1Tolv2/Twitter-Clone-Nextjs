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
  hr {
    border: none;
    height: 1px;
    background-color: lightgrey;
  }
  h3 {
    font-size: 1.4em;
    margin: 10px 5px;
    color: white;
  }
`;

const ProfileContainer = styled(ContainerStyle)`
  background-image: linear-gradient(190deg, #00ffcc, #5600d8);
  padding: 15px 10px;
  img {
    display: block;
    width: 130px;
    height: auto;
    border: solid 3px white;
    border-radius: 100px;
    margin: auto;
  }
  h2 {
    color: white;
    margin-top: 5px;
    margin-bottom: 0;
    text-align: center;
  }
  ${props => props.button && css`
  &:hover {
    opacity: 0.7;
  }
  `}
`;

const EditButton = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
img {
  pointer-events: none;
}
`

const FollowContainer = styled(ContainerStyle)`
  padding: 3px;
  background-image: linear-gradient(120deg, #ff98cb, #b3fff0);
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
const HashtagContainer = styled(ContainerStyle)`
  padding: 3px;
  background-image: linear-gradient(280deg, #ffc251, #d1b3ff);
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
      font-weight: 600;}
    }
  }
`;

export { Container, ProfileContainer, FollowContainer, HashtagContainer, EditButton };
