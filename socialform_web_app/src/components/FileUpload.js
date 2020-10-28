import React from "react";
// import CRUDService from "../services/CRUDService";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const FileUpload = () => {
  const [register, handleSubmit] = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);

    const res = await fetch("http://localhost:4000/picture", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(res));
  };

  return (
    <div>
      <form onSubmit={handleSubmit((onSubmit) => {})}>
        <input
          ref={register}
          type="file"
          // class="custom-file-input"
          name="picture"
        />
        <button type="button">submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
