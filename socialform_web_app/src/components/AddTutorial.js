import React, { useState, useEffect } from "react";
import axios from "axios";
import TutorialDataService from "../services/TutorialService";

function AddTutorial() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:44352/api/SFPosts")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddTutorial;
