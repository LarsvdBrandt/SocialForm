import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";

const EditPost = (props) => {
  const { state } = useLocation();
  const initialPostState = {
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  };

  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");

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
              <label htmlFor="title">title</label>
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
              <label htmlFor="imgSrc">imgSrc</label>
              <input
                type="text"
                className="form-control"
                id="imgSrc"
                name="imgSrc"
                value={currentPost.imgSrc}
                onChange={handleInputChange}
              />
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

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPost.title ? "Published" : "Pending"}
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
