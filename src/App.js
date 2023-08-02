import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
