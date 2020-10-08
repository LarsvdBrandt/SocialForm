import React, { useState, useEffect } from "react";
import axios from "axios";

class GetRequest extends React.Component {
  state = {
    SFposts: [],
  };

  componentDidMount() {
    axios.get("https://localhost:44352/api/SFPosts").then((res) => {
      console.log(res);
      this.setState({ SFposts: res.data });
    });
  }
  render() {
    return (
      <ul>
        {this.state.SFposts.map((SFpost) => (
          <li>{SFpost.title}</li>
        ))}
      </ul>
    );
  }
}
export default GetRequest;
