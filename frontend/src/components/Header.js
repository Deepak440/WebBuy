import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  return (
  
      <header>
        <Navbar bg='light' expand='lg' collapseOnSelect>
          <Container >
            <LinkContainer to ='/'>
            <Navbar.Brand > <h1> <strong> WebBuy</strong>  </h1>  </Navbar.Brand>
             </LinkContainer>
       
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to = "/cart">
                <Nav.Link href='/cart'> <i className = 'fas fa-shopping-cart'> </i> Cart </Nav.Link>
   
                </LinkContainer>
                <LinkContainer to = "/login">
                <Nav.Link href='/login'> <i className ='fas fa-user '> </i> Sign In</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    
  );
};

export default Header;
