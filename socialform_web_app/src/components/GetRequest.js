import React, { useState, useEffect } from "react";
import axios from "axios";

class GetRequest extends React.Component {
  state = {
    SFposts: [],
    id: "",
  };

  componentDidMount() {
    axios.get("https://localhost:44352/api/SFPosts").then((res) => {
      console.log(res);
      this.setState({ SFposts: res.data });
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person ID:
            <input type="text" name="id" onChange={this.handleChange} />
          </label>
          <button type="submit">Delete</button>
        </form>
        <ul>
          {this.state.SFposts.map((SFpost) => (
            <li>
              {SFpost.title} | met het ID {SFpost.id}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default GetRequest;
