import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import "./header.css";

const basicStyles = {
  color: "#fff",
  margin: "0 10px 0 10px",
};

const Header = () => {
  const { authState } = useAuth();

  return (
    <header className="header">
      <nav className="header__nav nav__button">
        <button className="nav_button__more"></button>
        <Link to="/">
          <button className="nav_button__trello">Crello</button>
        </Link>
        <div className="nav__button__sign-in">
          {authState === "authenticated" ? (
            <>
              <Link to="/profile" style={basicStyles}>
                Profile
              </Link>

              <Link to="/protected" style={basicStyles}>
                Dashboard
              </Link>
            </>
          ) : null}

          {authState === "non-authenticated" ? (
            <Link to="/sign-in" style={basicStyles}>
              Sign In
            </Link>
          ) : null}
        </div>
      </nav>
      <div className="header__search search__container" id="search-box">
        <form className="search__container__form" action="#">
          <input
            className="search__container__input"
            id="search-box-input"
            type="search"
            autoComplete="off"
            placeholder="Search"
            name="search"
            autoFocus=""
            onKeyPress={() => this.event.keyCode !== 13}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
