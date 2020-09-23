import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import BodyIndex from "./components/BodyIndex";

function App() {
  return (
    <div className="container">
      <Navbar />
      <hr />
      <BodyIndex />
    </div>
  );
}

export default App;
