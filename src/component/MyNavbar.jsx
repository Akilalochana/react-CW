import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import './MyNavbar.css';

function MyNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">
          PROPERTY SEARCH
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#home" onClick={() => navigate("/")}>
            Home
          </Nav.Link>
          <Nav.Link href="#" className="ms-2">
            About Us
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;