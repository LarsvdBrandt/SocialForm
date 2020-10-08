import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonList = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.delete("https://localhost:44352/api/SFPosts/2").then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  return (
    <div className="container">
      <h2>Post test</h2>
      <form onSubmit={handleSubmit}>
        <button className="btn btn-primary" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
};
export default PersonList;
