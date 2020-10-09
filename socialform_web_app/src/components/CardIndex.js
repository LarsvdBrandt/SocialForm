import React from "react";
import testPhoto from "../images/TestPhoto.png";
import { Link } from "react-router-dom";

function CardIndex() {
  return (
    <div className="card" style={{ width: "260px" }}>
      <Link to="/PhotoDetails">
        <img className="card-image-index" src={testPhoto} alt="Logo" />
      </Link>
      <div className="card-body-index">
        <a className="card-title-index" href="username">
          @Gebruikersnaam
        </a>
        <p className="card-text-index">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
}

export default CardIndex;
