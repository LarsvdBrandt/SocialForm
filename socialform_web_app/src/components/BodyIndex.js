import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import { Link } from "react-router-dom";
import ProfilePic from "../images/ProfileImage.png";

function BodyIndex() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    PostService.getAll()
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="row mt-4 justify-content-center">
      {posts &&
        posts.map((post, index) => (
          <div
            className="card promoting-card ml-1 mb-1"
            style={{ maxWidth: "270px" }}
            key={post.id}
          >
            <div className="card-body d-flex flex-row">
              <img
                src={ProfilePic}
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
                alt="avatar"
              />

              <div>
                <Link
                  to={{
                    pathname: "/UserIndex/" + post.title,
                    state: post.title,
                  }}
                  style={{ color: "black" }}
                >
                  <h5 className="card-title font-weight-bold mb-2">
                    {post.title}
                  </h5>
                </Link>

                <p className="card-text">
                  <i className="far fa-clock pr-2"></i>12/11/2020
                </p>
              </div>
            </div>

            <div className="view overlay">
              <Link
                to={{
                  pathname: "/PhotoDetails/" + post.id,
                  state: post.id,
                }}
              >
                <img
                  className="card-img-top rounded-0 card-image-index"
                  src={require("../uploads/" + post.imgSrc)}
                  alt={post.imgSrc}
                />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BodyIndex;
