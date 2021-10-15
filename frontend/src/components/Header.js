import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
  
      <header>
        <Navbar bg='light' expand='lg' collapseOnSelect>
          <Container >
            <Navbar.Brand href='/'> <h1> <strong> WebBuy</strong>  </h1>  </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='/cart'> <i className = 'fas fa-shopping-cart'> </i> Cart </Nav.Link>
                <Nav.Link href='/login'> <i className ='fas fa-user '> </i> Sign In</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    
  );
};

export default Header;
