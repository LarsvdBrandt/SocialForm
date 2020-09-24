import React from "react";
import testPhoto from "../images/TestPhoto.png";
import { Link } from "react-router-dom";
import CardIndex from "./CardIndex";

function BodyIndex() {
  return (
    <div class="row mt-4 justify-content-center">
      <CardIndex />
      <CardIndex />
      <CardIndex />
      <CardIndex />
      <CardIndex />
      <CardIndex />
      <CardIndex />
      <CardIndex />
    </div>
  );
}

export default BodyIndex;
