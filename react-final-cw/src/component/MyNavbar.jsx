import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function MyNavbar() {

  const brandStyle = {
    fontFamily: "'Pacifico', cursive", 
    fontSize: '1.5rem',
    color: '#008000', 
  };
  return (
    <Navbar style={{ backgroundColor: '#fff', borderBottom: '1px solid #000' }} expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={brandStyle}>
            PROPERTY SEARCH
          </Navbar.Brand>
          <Nav className="ms-auto"> 
            <Nav.Link href="#home" style={{ color: '#000' }}>Home</Nav.Link>
            <Nav.Link href="#" className="ms-2" style={{ color: '#000' }}>About Us</Nav.Link>
            <Button variant="outline-success">Favourite</Button>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default MyNavbar