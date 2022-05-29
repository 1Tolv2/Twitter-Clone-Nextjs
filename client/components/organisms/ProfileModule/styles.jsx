import styled from "styled-components";

const Container = styled.div`
width: 100%;
height: fit-content;
background-color: white;
margin-bottom: 10px;
padding: 3px;
`

const ImageContainer = styled.div`
position: relative;
height: 25%;
min-height: 80px;
width: 100%;
background-image: linear-gradient(50deg, orange, pink);
text-align: center;
img {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 100px;
    width: auto;
    border: solid 3px white;
    border-radius: 100px;
    background-color: white;
}

@media (min-width: 1025px) {
    min-height: 100px;
    img {
        height: 130px;
        transform: none;
        left: 70%;
    }
}
`
const InfoContainer = styled.div`
text-align: center;
height: 50%;
min-height: 100px;
width: 100%;
margin-top: 15px;
padding: 15px 10px;
h2, p {
    margin: 0;
}
@media (min-width: 1025px) {
    text-align: left;
}
`

const FollowContainer = styled.div`
display: flex;
justify-content: space-between;
align-items:  center;
span {
    margin-right: 10px;
}
`
const Button = styled.div`
    text-align: center;

  width: 130px;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background-color: #5600d8;
  border: none;
  padding: 7px 15px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
opacity: 0.7;
  }
`
    

export {Container, ImageContainer, InfoContainer, FollowContainer, Button}