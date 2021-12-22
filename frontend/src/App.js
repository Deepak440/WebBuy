import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // Container makes content center and horrzontally pad
import ProductScreen from "./Screen/ProductScreen" ;
import HomeScreen from "./Screen/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      <Header />
      <main className = 'py-3'>
        <Container>
        <Route path = '/' component = {HomeScreen} exact />
        <Route path = '/product/:id' component = {ProductScreen}  />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
