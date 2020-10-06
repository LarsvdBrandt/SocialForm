import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import CardIndex from "./components/CardIndex.js";
import BodyIndex from "./components/BodyIndex";
import AddTutorial from "./components/AddTutorial";
import Footer from "./components/Footer";
import PhotoDetails from "./components/PhotoDetails";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <hr />
        <Route exact path="/" component={BodyIndex} />
        <Route path="/Login" component={AddTutorial} />
        <Route path="/PhotoDetails" component={PhotoDetails} />
        <hr />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
