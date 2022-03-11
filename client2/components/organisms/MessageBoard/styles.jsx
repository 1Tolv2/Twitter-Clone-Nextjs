import styled from 'styled-components'

const Container = styled.div`
width: 100%;`

const List = styled.ul`
list-style: none;
margin: 0; 
padding: 0;`

const ListItem = styled.li`
width: 100%;
background-color: white;
margin-bottom: 10px;
padding: 10px;
a {
    color: #5600d8;
}
`
    
export {Container, List, ListItem}