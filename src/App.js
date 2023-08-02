import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
