import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    //naar kijken voor img
    "Content-type": "application/json",
  },
});
