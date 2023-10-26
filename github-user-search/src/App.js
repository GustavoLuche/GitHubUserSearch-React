import React from "react";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Search from "./components/Search";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header title="GitHub User Search" />
      <Container className="App-container">
        <Search onSearch={null} />
      </Container>
    </div>
  );
}

export default App;
