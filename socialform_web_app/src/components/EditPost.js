import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditPost = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  const initialPostState = {
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  };
  console.log(state);

  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(""); // storing the uploaded file
  // storing the recived file from backend
  const [data, getFile] = useState({ name: "", path: "" });
  const [progress, setProgess] = useState(0); // progess bar
  const el = useRef(); // accesing input element

  const getPost = (id) => {
    PostService.get(state)
      .then((response) => {
        setCurrentPost(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPost(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const handleUpload = (e) => {
    setProgess(0);
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.files[0].name });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentPost.id,
      title: currentPost.title,
      imgSrc: currentPost.imgSrc,
      comment: currentPost.comment,
    };

    PostService.update(currentPost.id, data)
      .then((response) => {
        setCurrentPost({ ...currentPost, published: status });
        console.log(response.data);
        setMessage("update successful");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePost = () => {
    PostService.update(currentPost.id, currentPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
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

  const deletePost = () => {
    PostService.remove(currentPost.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {currentPost ? (
        <div className="edit-form">
          <h4>Post</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="imgSrc">Image: {currentPost.imgSrc}</label>
              <input
                type="text"
                className="form-control"
                id="imgSrc"
                name="imgSrc"
                value={currentPost.imgSrc}
                hidden
              />
            </div>
            <div class="custom-file mb-3">
              <input
                type="file"
                class="custom-file-input"
                type="file"
                name="imgSrc"
                onChange={handleUpload}
              />
              <label class="custom-file-label" for="customFile">
                Choose file
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="comment">comment</label>
              <input
                type="text"
                className="form-control"
                id="comment"
                name="comment"
                value={currentPost.comment}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deletePost}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePost}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};

export default EditPost;
