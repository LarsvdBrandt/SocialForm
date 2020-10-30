import http from "../common-api";

const getAll = () => http.get("/SFComments");

const create = (data) => {
  return http.post("/SFComments", data);
};

export default {
  getAll,
  create,
};
