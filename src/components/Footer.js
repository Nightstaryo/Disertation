import { Container, Row, Col, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facebook, Twitter, Instagram, Linkedin } from "react-bootstrap-icons";
function Footer(){




    return (
  <footer >
<Navbar fixed="bottom" bg="dark" variant="dark">
  <Container>
    <Row>
    <Col md={6} className="text-left text-muted">
        <p>Contact Us:</p>
        <ul>
          <li>Email: James@Northumbria.com</li>
          <li>Phone: 0000000000</li>
          <li>Address: </li>
        </ul>
      </Col>
      <Col md={6} className="text-right text-muted">
        <p>Follow Us:</p>
        <ul>
        <a href="#"><Facebook size={30}/></a>
        <a href="#"><Twitter size={30}/></a>
        <a href="#"><Instagram size={30}/></a>
         <a href="#"><Linkedin size={30}/></a>
        </ul>
      </Col>
    </Row>
    <Row>
      <Col md={12} className="text-center text-muted">
        <div>© 2023 My Company</div>
      </Col>
    </Row>
  </Container>
</Navbar>
     
       </footer>
    );
    
    }
    export default Footer