import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";

const EditPost = (props) => {
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  });

  const getPost = (id) => {
    CRUDService.get(id)
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

    CRUDService.update(currentPost.id, data)
      .then((response) => {
        setCurrentPost({ ...currentPost, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePost = () => {
    CRUDService.update(currentPost.id, currentPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePost = () => {
    CRUDService.remove(currentPost.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/tutorials");
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
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a post...</p>
        </div>
      )}
    </div>
  );
};

export default EditPost;
