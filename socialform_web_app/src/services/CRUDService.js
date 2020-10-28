import http from "../http-common";

const getAll = () => http.get("/SFPosts");


const get = (id) => {
  return http.get(`/SFPosts/${id}`);
};

const create = (data) => {
  return http.post("/SFPosts", data);
};

const update = (id, data) => {
  return http.put(`/SFPosts/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/SFPosts/${id}`);
};

const removeAll = () => {
  return http.delete(`/SFPosts`);
};

const findByTitle = (title) => {
  return http.get(`/SFPosts?title=${title}`);
};

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  upload,
  getFiles,
};
