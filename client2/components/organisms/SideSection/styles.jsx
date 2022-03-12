import styled from "styled-components";

const Container = styled.div`
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
  padding: 15px 10px;
  hr {
    border: none;
    height: 1px;
    background-color: lightgrey;
  }
`;

const ProfileContainer = styled(ContainerStyle)`
  img {
    display: block;
    width: 130px;
    height: auto;
    border-radius: 100px;
    margin: auto;
  }
  h2 {
    margin-top: 5px;
    margin-bottom: 0;
    text-align: center;
  }
`;

const FollowContainer = styled(ContainerStyle)``;
const HashtagContainer = styled(ContainerStyle)``;

export { Container, ProfileContainer, FollowContainer, HashtagContainer };
