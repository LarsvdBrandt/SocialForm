import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";
import { Link } from "react-router-dom";
// import CardIndex from "./CardIndex";

function BodyIndex() {
  const [posts, setPosts] = useState([]);

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
  return (
    <div className="row mt-4 justify-content-center">
      {posts &&
        posts.map((post, index) => (
          <div className="card" style={{ width: "260px" }}>
            <Link
              to={{
                pathname: "/PhotoDetails/" + post.id,
                state: post.id,
              }}
            >
              <img
                className="card-image-index"
                src={require("../uploads/" + post.imgSrc)}
                alt={posts.imgSrc}
              />
            </Link>
            <div className="card-body-index">
              <a className="card-title-index" href="username">
                {"@" + post.title}
              </a>
              <p className="card-text-index">{post.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default BodyIndex;
