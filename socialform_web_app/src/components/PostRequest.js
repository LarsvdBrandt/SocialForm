import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";
import  axios from 'axios'

const PostRequest = () => {
  const [post, setPost] = useState({ title: "", imgSrc: "", comment: "" });
  const [message, setMessage] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setPost({ ...post, [e.target.name]: e.target.files[0].name });
  };

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

    //fileupload
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file);
    formData.append("fileName", fileName);
    try{
      axios.post("https://localhost:44352/api/FileUpload", formData).then((res) => {
      console.log(res);
      });
    }
    catch(ex){
      console.log(ex);
    }

  };
  return (
    <div className="container">
      <h2>Post test</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Gebruiker</label>
          <input
            className="form-control"
            placeholder="User"
            type="text"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label for="title">Foto</label>
        <input className="form-control-file" type="file" name="imgSrc" onChange={saveFile} required />
      </div>
        <div>
          <label for="title">Comment</label>
          <input
            className="form-control"
            placeholder="Comment"
            type="text"
            name="comment"
            onChange={handleChange}
            required
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
