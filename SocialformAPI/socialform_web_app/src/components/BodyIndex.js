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

// function MyVerticallyCenteredModal(props) {
//   const idNumber = Number(props.id);
//   const [currentPost, setCurrentPost] = useState([]);
//   console.log(props);

//   useEffect(() => {
//     getPost();
//   }, []);

//   const getPost = () => {
//     PostService.get(idNumber)
//       .then((response) => {
//         console.log(response.data);
//         setCurrentPost(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState({
//     PostId: idNumber,
//     UserId: 1,
//     Comment: "",
//   });

//   const [likes, setLikes] = useState("");
//   const [newLike, setNewLike] = useState({
//     PostId: idNumber,
//     UserId: 1,
//     Like: true,
//   });

//   const handleChange = (event) => {
//     setNewComment({ ...newComment, [event.target.name]: event.target.value });
//   };

//   const removeComment = async (event) => {
//     CommentService.remove(event.id)
//       .then((response) => {
//         console.log(response.data);
//         refreshList();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     CommentService.create(newComment)
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//         refreshList();
//         handleReset();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const addLike = async () => {
//     LikeService.create(newLike)
//       .then((res) => {
//         console.log(res);
//         console.log(res.data);
//         refreshList();
//         handleReset();
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const handleReset = () => {
//     Array.from(document.querySelectorAll("input")).forEach(
//       (input) => (input.value = "")
//     );
//     this.setState({
//       itemvalues: [{}],
//     });
//   };

//   useEffect(() => {
//     retrieveComments();
//     retrieveLikes();
//   }, []);

//   const retrieveComments = () => {
//     CommentService.getAll(idNumber)
//       .then((response) => {
//         setComments(response.data);
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const retrieveLikes = () => {
//     LikeService.getAll(idNumber)
//       .then((response) => {
//         setLikes(response.data.length.toString());
//         console.log(response.data.length.toString());
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   const refreshList = () => {
//     retrieveComments();
//     retrieveLikes();
//   };

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
                  src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
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
