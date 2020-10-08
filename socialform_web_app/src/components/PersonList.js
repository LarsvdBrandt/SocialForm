import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonList = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleChange} />
          ImgSrc:
          <input type="text" name="imgSrc" onChange={handleChange} />
          Comment:
          <input type="text" name="comment" onChange={handleChange} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default PersonList;
