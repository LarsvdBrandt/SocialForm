import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";

const PhotoDetails = (props) => {
  const { state } = useLocation();
  const initialPostState = {
    id: null,
    title: "",
    imgSrc: "",
    comment: "",
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    PostId: 1,
    UserId: 1,
    Comment: "",
  });

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    CommentService.create(newComment)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        refreshCommentList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  const retrieveComments = () => {
    CommentService.getAll()
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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

  const refreshCommentList = () => {
    retrieveComments();
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
            src={require("../uploads/" + "test1.jpg")}
            alt={"http://localhost:3000/src/uploads/" + currentPost.imgSrc}
          />
        </div>
        <div className="col-lg-6">
          <h3>@{currentPost.title}</h3>
          <div className="card card-info photodetailscommentcontainer  scrollbar">
            <div className="card-block">
              <h6>{currentPost.comment}</h6>
              <hr></hr>
            </div>

            {comments &&
              comments.map((comment, index) => (
                <div>
                  <p>{comment.comment}</p>
                </div>
              ))}
          </div>
          <div className="pb-cmnt-container">
            <div className="photodetailscommentcontainer">
              <div className="card card-info">
                <div className="card-block">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        className="pb-cmnt-textarea"
                        placeholder="Write your comment here!"
                        type="text"
                        name="comment"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button
                      className="btn btn-secondary btn-lg btn-block"
                      type="submit"
                    >
                      Comment
                    </button>
                  </form>
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
