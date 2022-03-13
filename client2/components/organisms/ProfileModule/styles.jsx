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
h2 {
    margin: 0;
}
div {
    text-align: right;
}
@media (min-width: 1025px) {
    text-align: left;
}
`
    

export {Container, ImageContainer, InfoContainer}