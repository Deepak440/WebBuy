import React from "react";
import { Container } from "react-bootstrap"; // Container makes content ceneter and horrzontally pad
import HomeScreen from "./Screen/HomeScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Header />
      <main className = 'py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
