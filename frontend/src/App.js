import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // Container makes content center and horrzontally pad
import ProductScreen from "./Screen/ProductScreen" ;
import HomeScreen from "./Screen/HomeScreen";
import CartScreen from "./Screen/CartScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";
import ProfileScreen from "./Screen/ProfileScren";
const App = () => {
  return (
    <Router>
      <Header />
      <main className = 'py-3'>
        <Container>
        <Route path ='/profile' component = {ProfileScreen}/>
        <Route path ='/register' component = {RegisterScreen}/>
        <Route path ='/login' component = {LoginScreen}/>
        <Route path = '/product/:id' component = {ProductScreen}  />
        <Route path = '/cart/:id?' component = {CartScreen}  />
        <Route path = '/' component = {HomeScreen} exact />

        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
