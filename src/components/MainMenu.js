import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function MainMenu(props){
  const handleSignOut = () => {
    props.handleAuthenticated(false)
    localStorage.removeItem('token')
}

return(
    <Navbar bg="dark" variant = "dark" expand="lg" sticky="top" >
    <Container>
     
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

       <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
       <LinkContainer to="/devices"><Nav.Link>Devices</Nav.Link></LinkContainer>
       <LinkContainer to="/createSchedule"><Nav.Link>Create Schedule</Nav.Link></LinkContainer>
       {!props.authenticated &&
          <Nav>
       <LinkContainer to="/login"><Nav.Link>Log in</Nav.Link></LinkContainer>
       <LinkContainer to="/signUp"><Nav.Link>SignUp</Nav.Link></LinkContainer>
       </Nav>
}
       {props.authenticated &&
 <Form>
 <Button variant="secondary" className="ms-2" onClick={handleSignOut}>Log Out</Button>       
</Form>
}
</Nav>
</Navbar.Collapse>
    </Container>
  </Navbar>



);


}
export default MainMenu