import http from "../common-api";

const getAll = (id) => http.get(`/SFComments/${id}`);

const create = (data) => {
  return http.post("/SFComments", data);
};

const remove = (id) => {
  return http.delete(`/SFComments/${id}`);
};

export default {
  getAll,
  create,
  remove,
};
