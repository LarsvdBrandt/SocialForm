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
    <div class="bg-white shadow rounded overflow-hidden">
      <div class="px-4 pt-0 pb-4 cover">
        <div class="media align-items-end profile-head">
          <div class="profile mr-3">
            <img
              src={ProfilePic}
              alt="..."
              width="130"
              class="rounded mb-2 img-thumbnail"
            />
            <a href="#" class="btn btn-outline-dark btn-sm btn-block">
              Edit profile
            </a>
          </div>
          <div class="media-body mb-5 text-white">
            <h4 class="mt-0 mb-0">{state}</h4>
            <p class="small mb-4">
              {" "}
              <i class="fas fa-map-marker-alt mr-2"></i>
              Nederland
            </p>
          </div>
        </div>
      </div>
      <div class="bg-light p-4 d-flex justify-content-end text-center">
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <h5 class="font-weight-bold mb-0 d-block">{postsCount}</h5>
            <small class="text-muted">
              {" "}
              <i class="fas fa-image mr-1"></i>Photos
            </small>
          </li>
          <li class="list-inline-item">
            <h5 class="font-weight-bold mb-0 d-block">163</h5>
            <small class="text-muted">
              {" "}
              <i class="fas fa-user mr-1"></i>Followers
            </small>
          </li>
          <li class="list-inline-item">
            <h5 class="font-weight-bold mb-0 d-block">180</h5>
            <small class="text-muted">
              {" "}
              <i class="fas fa-user mr-1"></i>Following
            </small>
          </li>
        </ul>
      </div>
      <div class="py-4 px-4">
        <div class="d-flex align-items-center justify-content-between mb-3"></div>
        <div class="row">
          {posts &&
            posts.map((post, index) => (
              <div class="col-lg-3 mb-2 pr-lg-1">
                <Link
                  to={{
                    pathname: "/PhotoDetails/" + post.id,
                    state: post.id,
                  }}
                >
                  <img
                    src={require("../uploads/" + post.imgSrc)}
                    alt={post.imgSrc}
                    className="UserIndexPhotos"
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserIndex;
