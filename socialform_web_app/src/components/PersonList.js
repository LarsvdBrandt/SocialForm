import React, { useState, useEffect } from "react";
import axios from "axios";
import TutorialDataService from "../services/TutorialService";

export default class PersonList extends React.Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    fetch("https://localhost:44352/api/SFPosts")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  render() {
    return (
      <ul>
        {this.state.persons.map((person) => (
          <li>{person.name}</li>
        ))}
      </ul>
    );
  }
}
