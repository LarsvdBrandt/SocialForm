import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "../images/ProfileImage.png";
import { post } from "jquery";

function UserIndex(props) {
  const history = useHistory();
  const { state } = useLocation();

  const [posts, setPosts] = useState("");
  const [postsCount, setPostsCount] = useState("");

  const retrievePosts = () => {
    PostService.getAllByName(state)
      .then((response) => {
        setPosts(response.data);
        setPostsCount(response.data.length.toString());
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrievePosts();
  }, []);

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="px-4 pt-0 pb-4 cover">
        <div className="media align-items-end profile-head">
          <div className="profile mr-3">
            <img
              src={ProfilePic}
              alt="profilePicture"
              width="130"
              className="rounded mb-2 img-thumbnail"
            />
            <a href="#" className="btn btn-outline-dark btn-sm btn-block">
              Edit profile
            </a>
          </div>
          <div className="media-body mb-5 text-white">
            <h4 className="mt-0 mb-0">{state}</h4>
            <p className="small mb-4">
              {" "}
              <i className="fas fa-map-marker-alt mr-2"></i>
              Nederland
            </p>
          </div>
        </div>
      </div>
      <div className="bg-light p-4 d-flex justify-content-end text-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <h5 className="font-weight-bold mb-0 d-block">{postsCount}</h5>
            <small className="text-muted">
              {" "}
              <i className="fas fa-image mr-1"></i>Photos
            </small>
          </li>
          <li className="list-inline-item">
            <h5 className="font-weight-bold mb-0 d-block">163</h5>
            <small className="text-muted">
              {" "}
              <i className="fas fa-user mr-1"></i>Followers
            </small>
          </li>
          <li className="list-inline-item">
            <h5 className="font-weight-bold mb-0 d-block">180</h5>
            <small className="text-muted">
              {" "}
              <i className="fas fa-user mr-1"></i>Following
            </small>
          </li>
        </ul>
      </div>
      <div className="row mt-4 justify-content-center">
        {posts &&
          posts.map((post, index) => (
            <div className="ml-2 mb-1">
              <Link
                to={{
                  pathname: "/PhotoDetails/" + post.id,
                  state: post.id,
                }}
              >
                <img
                  src={require("../uploads/" + post.imgSrc)}
                  alt="Image"
                  className="UserIndexPhotos"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserIndex;
