import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";
import { withRouter } from "react-router-dom";

const PostRequest = () => {
  const [post, setPost] = useState({ title: "", imgSrc: "", comment: "" });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    CRUDService.create(post).then((res) => {
      console.log(res);
      console.log(res.data);
      setMessage("Er is een post aangemaakt!");
    });
  };
  return (
    <div className="container">
      <h2>Post test</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Gebruiker</label>
          <input
            className="form-control"
            placeholder="Title"
            type="text"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="ImgSrc">ImgSrc</label>
          <input
            className="form-control"
            placeholder="ImgSrc"
            type="text"
            name="imgSrc"
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="title">Comment</label>
          <input
            className="form-control"
            placeholder="Comment"
            type="text"
            name="comment"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="alert alert-light" role="alert">
        {message}
      </div>
    </div>
  );
};
export default PostRequest;
