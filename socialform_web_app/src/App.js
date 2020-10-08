import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import GetRequest from "./components/GetRequest.js";
import PostRequest from "./components/PostRequest.js";
import BodyIndex from "./components/BodyIndex";
import PersonList from "./components/PersonList";
import Footer from "./components/Footer";
import PhotoDetails from "./components/PhotoDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <hr />
        <Route exact path="/" component={BodyIndex} />
        <Route path="/Login" component={PersonList} />
        <Route path="/PhotoDetails" component={PhotoDetails} />
        <Route path="/PostRequest" component={PostRequest} />
        <Route path="/GetRequest" component={GetRequest} />
        <hr />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
