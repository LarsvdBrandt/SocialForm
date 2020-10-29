import React, { useRef, useState } from "react";
import CRUDService from "../services/CRUDService";
import axios from "axios";
import { useHistory } from "react-router-dom";

const PostRequest = () => {
  const history = useHistory();
  const [post, setPost] = useState({ title: "", imgSrc: "", comment: "" });
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleUpload = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
    setPost({ ...post, [e.target.name]: e.target.files[0].name });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    CRUDService.create(post).then((res) => {
      console.log(res);
      console.log(res.data);
      setMessage("Er is een post aangemaakt!");
    });

    const formData = new FormData();
    formData.append("file", file); // appending file
    axios
      .post("http://localhost:4500/upload", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
      .then((res) => {
        console.log(res);
        getFile({
          name: res.data.name,
          path: "http://localhost:4500" + res.data.path,
        });
        history.push("/");
      })
      .catch((err) => console.log(err));
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
        <p>Image</p>
        <div class="custom-file mb-3">
          <input
            type="file"
            class="custom-file-input"
            type="file"
            ref={el}
            name="imgSrc"
            onChange={handleUpload}
            required
          />
          <label class="custom-file-label" for="customFile">
            Choose file
          </label>
        </div>
        {/* <div>
        <label for="title">Foto</label>
        <input className="form-control-file" type="file" name="imgSrc" onChange={saveFile} required />
        </div> */}
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
