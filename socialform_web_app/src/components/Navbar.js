import socialformlogo from "../images/socialformlogo.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Navbar() {
  const [searchBarTitle, setSearchBarTitle] = useState({ title: "" });

  const handleChange = (event) => {
    setSearchBarTitle({
      ...searchBarTitle,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link to="/" className="navbar-title">
        <img className="navbar-Logo" src={socialformlogo} alt="Logo" />
        SocialForm
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            name="title"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
          />
          <Link
            to={{
              pathname: "/UserIndex/" + searchBarTitle.title,
              state: searchBarTitle.title,
            }}
          >
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </Link>
        </form>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/Login" className="nav-link text-uppercase">
              Login
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/GetRequest" className="nav-link text-uppercase">
              Get
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/PostRequest" className="nav-link text-uppercase">
              Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
