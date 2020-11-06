import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:53318/api",
  headers: {
    //naar kijken voor img
    "Content-type": "application/json",
  },
});
