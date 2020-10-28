import React, { useState, useEffect } from "react";
import CRUDService from "../services/CRUDService";
import axios from "axios";
import { useHistory } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", file);
    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };

  return (
    <div>
      <input
        type="file"
        // class="custom-file-input"
        name="imgSrc"
        onChange={onChangeHandler}
      />
      <input type="button" value="upload" onClick={onClickHandler} />
    </div>
  );
};

export default FileUpload;
