import http from "../common-api";

const getAll = (id) => http.get(`/SFLikes/${id}`);

const create = (data) => {
  return http.post("/SFLikes", data);
};

const remove = (id) => {
  return http.delete(`/SFLikes/${id}`);
};

export default {
  getAll,
  create,
  remove,
};
