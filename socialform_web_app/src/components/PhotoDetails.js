import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
import LikeService from "../services/LikeService";
import xmark from "../images/x-mark.png";
import LikeIcon from "../images/LikeIcon.jpg";
import { Link } from "react-router-dom";
import ProfilePic from "../images/ProfileImage.png";
import Loading from "../images/giphy.gif";

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
  const [positive, setPositive] = useState(false);
  const [newComment, setNewComment] = useState({
    PostId: state,
    UserId: 1,
    Comment: "",
  });

  const [likes, setLikes] = useState("");
  const [newLike, setNewLike] = useState({
    PostId: state,
    UserId: 1,
    Like: true,
  });

  const handleChange = (event) => {
    setNewComment({ ...newComment, [event.target.name]: event.target.value });
  };

  const removeComment = async (event) => {
    CommentService.remove(event.id)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    CommentService.create(newComment)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        refreshList();
        handleReset();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addLike = async () => {
    LikeService.create(newLike)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        refreshList();
        handleReset();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    this.setState({
      itemvalues: [{}],
    });
  };

  useEffect(() => {
    retrieveComments();
    retrieveLikes();
  }, []);

  const retrieveComments = () => {
    CommentService.getAll(state)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveLikes = () => {
    LikeService.getAll(state)
      .then((response) => {
        setLikes(response.data.length.toString());
        console.log(response.data.length.toString());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPost = () => {
    PostService.get(state)
      .then((response) => {
        setCurrentPost(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveComments();
    retrieveLikes();
  };

  useEffect(() => {
    // if (props.match.params.id != undefined) {
    //   console.log(props.match.params.id);
    // }
    getPost();
    const timer = setTimeout(() => {
      setPositive(true);
      console.log(positive);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (positive === false) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img
              className="photodetailsImg"
              src={Loading}
              alt={"http://localhost:3000/src/uploads/" + currentPost.imgSrc}
            />
          </div>
          <div className="col-lg-6">
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <img
                    src={ProfilePic}
                    className="rounded-circle mr-3"
                    height="70px"
                    width="70px"
                    alt="avatar"
                  />
                </div>
                <div className="col-sm-7">
                  <Link
                    to={{
                      pathname: "/UserIndex/" + currentPost.title,
                      state: currentPost.title,
                    }}
                    style={{ color: "black" }}
                  >
                    <h3 className="card-title font-weight-bold mb-2">
                      {currentPost.title}
                    </h3>
                  </Link>
                  <p className="card-text">
                    <i className="far fa-clock pr-2"></i>12/11/2020
                  </p>
                </div>
                <div className="col-sm-1">
                  <span onClick={() => addLike({ PostId: state })}>
                    <img src={LikeIcon} style={{ height: "35px" }}></img>
                  </span>
                </div>
                <div className="col-sm-2">
                  <h3>{likes}</h3>
                </div>
              </div>
            </div>
            <div className="card card-info photodetailscommentcontainer  scrollbar">
              <div>
                <h6 className="card-block-fixed">{currentPost.comment}</h6>
                <hr></hr>
              </div>

              {comments &&
                comments.map((comment, index) => (
                  <div>
                    <div className="row">
                      <div className="col-sm-1">
                        <span
                          onClick={() =>
                            removeComment({ id: comment.commentId })
                          }
                        >
                          <img src={xmark} style={{ height: "10px" }}></img>
                        </span>
                      </div>
                      <div className="col-sm-11">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="row">
              <div className="pb-cmnt-container col-sm-10">
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
                          className="btn btn-outline-success my-2 my-sm-0"
                          style={{ width: "100%" }}
                          type="submit"
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-cmnt-container col-sm-2 likecontainer">
                <span onClick={addLike}>
                  <img
                    src={LikeIcon}
                    style={{ height: "60px", border: "0px" }}
                  ></img>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
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
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <img
                    src={ProfilePic}
                    className="rounded-circle mr-3"
                    height="70px"
                    width="70px"
                    alt="avatar"
                  />
                </div>
                <div className="col-sm-7">
                  <Link
                    to={{
                      pathname: "/UserIndex/" + currentPost.title,
                      state: currentPost.title,
                    }}
                    style={{ color: "black" }}
                  >
                    <h3 className="card-title font-weight-bold mb-2">
                      {currentPost.title}
                    </h3>
                  </Link>
                  <p className="card-text">
                    <i className="far fa-clock pr-2"></i>12/11/2020
                  </p>
                </div>
                <div className="col-sm-1">
                  <span onClick={() => addLike({ PostId: state })}>
                    <img src={LikeIcon} style={{ height: "35px" }}></img>
                  </span>
                </div>
                <div className="col-sm-2">
                  <h3>{likes}</h3>
                </div>
              </div>
            </div>
            <div className="card card-info photodetailscommentcontainer  scrollbar">
              <div>
                <h6 className="card-block-fixed">{currentPost.comment}</h6>
                <hr></hr>
              </div>

              {comments &&
                comments.map((comment, index) => (
                  <div>
                    <div className="row">
                      <div className="col-sm-1">
                        <span
                          onClick={() =>
                            removeComment({ id: comment.commentId })
                          }
                        >
                          <img src={xmark} style={{ height: "10px" }}></img>
                        </span>
                      </div>
                      <div className="col-sm-11">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="row">
              <div className="pb-cmnt-container col-sm-10">
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
                          className="btn btn-outline-success my-2 my-sm-0"
                          style={{ width: "100%" }}
                          type="submit"
                        >
                          Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-cmnt-container col-sm-2 likecontainer">
                <span onClick={addLike}>
                  <img
                    src={LikeIcon}
                    style={{ height: "60px", border: "0px" }}
                  ></img>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PhotoDetails;
