import React from "react";
import testPhoto from "../images/TestPhoto.png";

function PhotoDetails() {
  return (
    <a href="Photodetails">
      <img className="card-image-index" src={testPhoto} alt="Logo" />
    </a>
  );
}

export default PhotoDetails;
