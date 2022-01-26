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
import ShippingScreen from "./Screen/ShippingScreen";
import PaymentScreen from "./Screen/PaymentScreeen";
import PlaceorderScreen from "./Screen/PlaceorderScreen";
import OrderScreen from "./Screen/OrderScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className = 'py-3'>
        <Container>
        <Route path ='/payment' component = {PaymentScreen}/>
        <Route path ='/order/:id' component = {OrderScreen}/>
        <Route path ='/placeorder' component = {PlaceorderScreen}/>
        <Route path ='/shipping' component = {ShippingScreen}/>
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
