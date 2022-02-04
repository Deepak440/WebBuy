import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import { Logout } from "../actions/userAction";

const Header = () => {

  const userLogin = useSelector((state ) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch  = useDispatch();
  const LogoutHandler  =  () =>{
    dispatch(Logout());
  }

  return (
  
      <header>
        <Navbar bg='dark'  variant ='dark'expand='lg' collapseOnSelect>
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
                {userInfo ?(<NavDropdown title = {userInfo.name} id ="username">
                  <LinkContainer to = "/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LogoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>) : ( <LinkContainer to = "/login">
                <Nav.Link href='/login'> <i className ='fas fa-user '> </i> Sign In</Nav.Link>
                </LinkContainer>)}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title = 'Admin' id = 'adminmenu'>
                  <LinkContainer to = '/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to = '/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to = '/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  
                </NavDropdown>)
                }
               
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    
  );
};

export default Header;
