import React, { useState, useEffect } from "react";
import axios from "axios";

const PostRequest = () => {
  const [post, setPost] = useState({ title: "", imgSrc: "", comment: "" });

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("https://localhost:44352/api/SFPosts", post).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  return (
    <div className="container">
      <h2>Post test</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Title</label>
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
          Add
        </button>
      </form>
    </div>
  );
};
export default PostRequest;
