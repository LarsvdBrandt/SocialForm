import React, { useState, useEffect } from "react";
import PostService from "../services/PostService";
import { Link } from "react-router-dom";
import ProfilePic from "../images/ProfileImage.png";
import { Modal, Button, Row, Col } from "react-bootstrap";
import xmark from "../images/x-mark.png";
import LikeIcon from "../images/LikeIcon.jpg";
import CommentService from "../services/CommentService";
import LikeService from "../services/LikeService";

function MyVerticallyCenteredModal(props) {
  const idNumber = Number(props.id);
  const [currentPost, setCurrentPost] = useState([]);
  console.log(props);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    PostService.get(idNumber)
      .then((response) => {
        console.log(response.data);
        setCurrentPost(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    PostId: idNumber,
    UserId: 1,
    Comment: "",
  });

  const [likes, setLikes] = useState("");
  const [newLike, setNewLike] = useState({
    PostId: idNumber,
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
    CommentService.getAll(idNumber)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveLikes = () => {
    LikeService.getAll(idNumber)
      .then((response) => {
        setLikes(response.data.length.toString());
        console.log(response.data.length.toString());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveComments();
    retrieveLikes();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentPost.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <img
              className="photodetailsImg"
              src={require("../uploads/" + "among-us-1.jpg")}
              alt={"http://localhost:3000/src/uploads/" + currentPost.imgSrc}
            />

            <Row className="mt-3">
              <Col md={2}>
                <img
                  src={ProfilePic}
                  className="rounded-circle mr-3"
                  height="50px"
                  width="50px"
                  alt="avatar"
                />
              </Col>
              <Col md={6}>
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
              </Col>
              <Col md={1}>
                <span onClick={() => addLike({ PostId: idNumber })}>
                  <img src={LikeIcon} style={{ height: "35px" }}></img>
                </span>
              </Col>
              <Col md={2}>
                <h3 className="ml-2">{likes}</h3>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
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
            <Row>
              <Col md={9}>
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
              </Col>
              <Col md={3}>
                <div className="align-items-center">
                  <span onClick={addLike}>
                    <img
                      src={LikeIcon}
                      style={{
                        height: "50px",
                        border: "0px",
                        marginTop: "25px",
                      }}
                    ></img>
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
    <div className="row mt-4 justify-content-center">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        id="1"
      />
      <Button onClick={() => setModalShows()}>
        Launch vertically centered modal
      </Button>
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
