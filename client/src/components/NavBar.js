import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ session }) {
  return (
    <nav className="navbar is-transparent bbtm-lightgray">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          React Receipes
        </Link>
        <div
          className="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      {session && session.getCurrentUser ? (
        <AuthNavigation />
      ) : (
        <UnAuthNavigation />
      )}
    </nav>
  );
}

const UnAuthNavigation = () => (
  <div id="navbarExampleTransparentExample" className="navbar-menu">
    <div className="navbar-end">
      <Link className="navbar-item" to="/search">
        Search
      </Link>
      <Link className="navbar-item" to="/signin">
        Sign in
      </Link>
      <Link className="navbar-item" to="/signup">
        Sign up
      </Link>
    </div>
  </div>
);

const AuthNavigation = ({ session }) => (
  <div id="navbarExampleTransparentExample" className="navbar-menu">
    <div className="navbar-end">
      <Link className="navbar-item" to="/search">
        search
      </Link>
      <Link className="navbar-item" to="/add-receipe">
        add Recipe
      </Link>
      <Link className="navbar-item" to="/profile">
        profile
      </Link>
      <Link className="navbar-item" to="/signout">
        signout
      </Link>
    </div>
  </div>
);
