import React, { useState, useEffect, useRef } from "react";
import PostService from "../services/PostService";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation, useRouteMatch } from "react-router-dom";

const EditPost = (props) => {
  const history = useHistory();
  // const { state } = useLocation();
  let match = useRouteMatch("/EditPost/:photoid");
  let state = Number(match.params.photoid);
  const initialPostState = {
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  };
  //console.log(state);

  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(""); // storing the uploaded file

  const getPost = async (id) => {
    let apiResponse = await PostService.get(state);
    setCurrentPost(apiResponse.data);
    console.log(apiResponse.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0]; // accessing file
    console.log(file);
    setFile(file); // storing file
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.files[0].name });
  };

  const updatePost = async (event) => {
    event.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("formFile", file); // appending file
    formData.append("fileName", currentPost.imgSrc); // appending fileName
    console.log(formData);
    axios
      .post("http://localhost:5000/ImageApi/File", formData)
      .then((res) => {
        console.log("succes");
      })
      .catch((err) => console.log(err));

    PostService.update(currentPost.id, currentPost)
      .then((response) => {
        console.log(response.data);
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
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
                data-testid="post-input-title"
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
                data-testid="post-input-image"
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
                data-testid="post-input-comment"
                value={currentPost.comment}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deletePost}>
            Delete
          </button>

          <button
            data-testid="post-input-submit"
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
