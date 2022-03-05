import React from "react";
import PropTypes from "prop-types";
import "../css/Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
  const location = useLocation();
  const onClickHandeler =()=>{
    localStorage.removeItem('token');
  }
  return (
    <header className="header">
      <div className="header__logo">
        <h4>
          <Link to="/">{props.title}</Link>
        </h4>
      </div>

      <nav className="header__nav">
        <ul className="nav__element">
          <li>
            <Link
              to="/"
              style={
                location.pathname === "/"
                  ? { color: "black" }
                  : { color: "#8a7878" }
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={
                location.pathname === "/about"
                  ? { color: "black" }
                  : { color: "#8a7878" }
              }
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header__search">
        <input
          type="text"
          placeholder="Search"
          className="header__searchInput"
        />
        <button className="header__searchBtn">Search</button>
      </div>
      <div className="user__container">
        {!localStorage.getItem("token") ? (
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="login" onClick={onClickHandeler}>Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Navbar;

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Set title here",
};
