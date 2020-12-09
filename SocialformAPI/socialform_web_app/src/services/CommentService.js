import http from "../common-api";

const BaseUri = "/CommentService/SFComments";

const getAll = (id) => http.get(BaseUri + "/" + id);

const create = (data) => {
  return http.post(BaseUri, data);
};

const remove = (id) => {
  return http.delete(BaseUri + "/" + id);
};

export default {
  getAll,
  create,
  remove,
};
