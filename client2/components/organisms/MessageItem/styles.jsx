import styled from "styled-components";

const ListItem = styled.li`
font-size: 1.1em;
  width: 100%;
  background-color: white;
  margin-bottom: 10px;
  padding: 15px 10px;
  a {
    color: #5600d8;
  }
  hr {
    border: none;
    height: 1px;
    background-color: lightgrey;
}

@media (min-width: 475px) {
border-radius: 5px;
  }

`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  h4 {
    width: 100%;
    margin: 0;
  }
  i {
      color: grey;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin-right: 15px;
`;

const MessageContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const InteractionContainer = styled.div`
display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0 0 0;

ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    li {
        display: flex;
        align-items: flex-start;
        margin: 0 20px 0 10px;
        cursor: pointer;
        span {
          pointer-events: none;
        }
        img {
            margin-right: 5px;
            pointer-events: none;
        }
        
    }
  }
`;

export {
  ListItem,
  ProfileContainer,
  Image,
  MessageContainer,
  InteractionContainer,
};
