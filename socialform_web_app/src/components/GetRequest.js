import React, { useState, useEffect } from "react";
import axios from "axios";

function GetRequest() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:44352/api/SFPosts/").then((res) => {
      const newPostList = res.data;
      setPostList(newPostList);
      console.log(res.data);
    });
  }, []);

  return (
    <li>
      <p>{postList.title}</p>
    </li>
  );
}
export default GetRequest;
