import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import GetRequest from "./components/GetRequest.js";
import PostRequest from "./components/PostRequest.js";
import BodyIndex from "./components/BodyIndex";
import EditPost from "./components/EditPost";
import Login from "./components/Login";
import Footer from "./components/Footer";
import PhotoDetails from "./components/PhotoDetails";
import FileUpload from "./components/FileUpload";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <hr />
        <Route exact path="/" component={BodyIndex} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/EditPost" component={EditPost} />
        <Route path="/PhotoDetails" component={PhotoDetails} />
        <Route path="/PostRequest" component={PostRequest} />
        <Route path="/GetRequest" component={GetRequest} />
        <Route path="/FileUpload" component={FileUpload} />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
