import http from "../common-api";

const BaseUri = "/PostService/SFPosts";

const getAll = () => http.get(BaseUri);

const get = (id) => {
  return http.get(BaseUri + "/" + id);
};

const create = (data) => {
  return http.post(BaseUri, data);
};

const update = (id, data) => {
  return http.put(BaseUri + "/" + id, data);
};

const remove = (id) => {
  return http.delete(BaseUri + "/" + id);
};

const removeAll = () => {
  return http.delete(BaseUri);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
