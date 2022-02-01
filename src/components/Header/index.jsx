import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { supabase } from "../../client";

import "./header.css";

const Header = () => {
  const [authState, setAuthState] = useState("non-authenticated");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthState("authenticated");
          return <Redirect to="/profile" />;
        } else if (event === "SIGNED_OUT") {
          setAuthState("non-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = await supabase.auth.user();
    if (user) {
      setAuthState("authenticated");
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("../../api/index.jsx", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  const basicStyles = {
    color: "#fff",
    margin: "0 10px 0 10px",
  };

  return (
    <header className="header">
      <nav className="header__nav nav__button">
        <button className="nav_button__more"></button>
        <button className="nav_button__trello">Crello</button>
        <div className="nav__button__sign-in">
          {authState === "authenticated" ? (
            <>
              <Link to="/profile" style={basicStyles}>
                Profile
              </Link>

              <Link to="/protected" style={basicStyles}>
                Protected
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
