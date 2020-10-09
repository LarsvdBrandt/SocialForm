import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    CRUDService.getAll()
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removePost = () => {
    CRUDService.remove(currentPost.id)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePosts();
    setCurrentPost(null);
    setCurrentIndex(-1);
  };

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Post List</h4>

        <ul className="list-group">
          {posts &&
            posts.map((post, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentPost ? (
          <div>
            <h4>Post ID: {currentPost.id}</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPost.title}
            </div>
            <div>
              <label>
                <strong>imgSrc:</strong>
              </label>{" "}
              {currentPost.imgSrc}
            </div>
            <div>
              <label>
                <strong>Comment:</strong>
              </label>{" "}
              {currentPost.comment}
            </div>

            <Link
              to={"/EditPost/" + currentPost.id}
              className="badge badge-warning"
            >
              Edit
            </Link>

            <button className="badge badge-danger ml-1" onClick={removePost}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a post...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
