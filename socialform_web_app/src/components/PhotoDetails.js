import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import testPhoto from "../images/TestPhoto.png";
import { CardDeck } from "react-bootstrap";

function PhotoDetails() {
  return (
    <a href="Photodetails">
      <img className="card-image-index" src={testPhoto} alt="Logo" />
    </a>
  );
}

export default PhotoDetails;
