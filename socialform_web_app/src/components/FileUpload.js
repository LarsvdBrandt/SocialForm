import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = () => {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };


const uploadFile = async (e) => {
  console.log(file);
  const formData = new FormData();
  formData.append("formFile", file);
  formData.append("fileName", fileName);
  try{
    const res = await axios.post("https://localhost:44352/api/FileUpload", formData);
    console.log(res);
  }
  catch(ex){
    console.log(ex);
  }
};
    return (
      <div>
        <input type="file" onChange={saveFile} />
        <input type="button" value="upload" onClick={uploadFile} />
      </div>
    );
  };

export default FileUpload;