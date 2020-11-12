import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import { Link } from "react-router-dom";
// import CardIndex from "./CardIndex";

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
            className="card promoting-card"
            style={{ maxWidth: "300px" }}
            key={post.id}
          >
            <div className="card-body d-flex flex-row">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
                alt="avatar"
              />

              <div>
                <h4 className="card-title font-weight-bold mb-2">
                  {post.title}
                </h4>
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

            <div className="card-body">
              <div className="collapse-content" id={post.id}>
                <p className="card-text collapse" id="collapseContent">
                  {post.comment}
                </p>

                <a
                  className="btn btn-flat p-1 my-1 mr-0 mml-1 collapsed"
                  data-toggle="collapse"
                  href="#collapseContent"
                  aria-expanded="false"
                  aria-controls="collapseContent"
                  id={post.id}
                >
                  <p className="text-primary">View comment</p>
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BodyIndex;
