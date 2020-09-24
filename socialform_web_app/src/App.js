import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import BodyIndex from "./components/BodyIndex";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container">
      <Navbar />
      <hr />
      <BodyIndex />
      <hr />
      <Footer />
    </div>
  );
}

export default App;
