import React from "react";
import { Link } from "react-router-dom";

function heading() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Keeper
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" aria-current="page" href="/">
              Create Post
            </Link>
            <a className="nav-link active" href="#">
              
            </a>
            <Link to="/all" className="nav-link active" href="/all">
              All Post
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default heading;
