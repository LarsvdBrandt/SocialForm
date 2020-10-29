import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CRUDService from "../services/CRUDService";

const PhotoDetails = (props) => {
  const { state } = useLocation();
  const initialPostState = {
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);

  const getPost = (id) => {
    CRUDService.get(state)
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
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <img
            className="photodetailsImg"
            src={require("../uploads/" + currentPost.imgSrc)}
            alt={"http://localhost:3000/src/uploads/" + currentPost.imgSrc}
          />
        </div>
        <div className="col-lg-6">
          <h3>@{currentPost.title}</h3>
          <div className="card card-info photodetailscommentcontainer">
            <div className="card-block">
              <h6>{currentPost.comment}</h6>
            </div>
          </div>
          <div className="pb-cmnt-container">
            <div className="photodetailscommentcontainer">
              <div className="card card-info">
                <div className="card-block">
                  <textarea
                    placeholder="Write your comment here!"
                    className="pb-cmnt-textarea"
                  ></textarea>
                  <button
                    className="btn btn-secondary btn-lg btn-block"
                    type="button"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;
