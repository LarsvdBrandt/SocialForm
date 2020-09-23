import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import testPhoto from "../images/TestPhoto.png";
import { CardDeck } from "react-bootstrap";

function BodyIndex() {
  return (
    <div class="row mt-5 ml-2 justify-content-center">
      <div class="card" style={{ width: "300px" }}>
        <a href="Photodetails">
          <img className="card-image-index" src={testPhoto} alt="Logo" />
        </a>
        <div class="card-body">
          <a class="card-title-index" href="username">
            @Gebruikersnaam
          </a>
          <p class="card-text-index">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div class="card" style={{ width: "300px" }}>
        <a href="Photodetails">
          <img className="card-image-index" src={testPhoto} alt="Logo" />
        </a>
        <div class="card-body">
          <a class="card-title-index" href="username">
            @Gebruikersnaam
          </a>
          <p class="card-text-index">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div class="card" style={{ width: "300px" }}>
        <a href="Photodetails">
          <img className="card-image-index" src={testPhoto} alt="Logo" />
        </a>
        <div class="card-body">
          <a class="card-title-index" href="username">
            @Gebruikersnaam
          </a>
          <p class="card-text-index">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div class="card" style={{ width: "300px" }}>
        <a href="Photodetails">
          <img className="card-image-index" src={testPhoto} alt="Logo" />
        </a>
        <div class="card-body">
          <a class="card-title-index" href="username">
            @Gebruikersnaam
          </a>
          <p class="card-text-index">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BodyIndex;
