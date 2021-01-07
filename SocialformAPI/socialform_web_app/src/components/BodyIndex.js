import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import { Link } from "react-router-dom";
import ProfilePic from "../images/ProfileImage.png";
import { Route, Switch } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import xmark from "../images/x-mark.png";
import LikeIcon from "../images/LikeIcon.jpg";
import CommentService from "../services/CommentService";
import LikeService from "../services/LikeService";

function BodyIndex() {
  const [posts, setPosts] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalId, setModalId] = useState("");

  const setModalShows = () => {
    console.log(modalId);
    setModalShow(true);
  };

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
    <div
      className="row mt-4 justify-content-center"
      data-testid="bodyindex-title"
    >
      {posts &&
        posts.map((post, index) => (
          <div
            className="card promoting-card ml-1 mb-1"
            style={{ width: "270px" }}
            key={post.id}
            data-testid="card"
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
                  <h5
                    className="card-title font-weight-bold mb-2"
                    data-testid="bodyindex-title"
                  >
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
                  src={"http://localhost:5000/imageapi/images/" + post.imgSrc}
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
