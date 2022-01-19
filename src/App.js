import React from "react";
import "./App.css";

const Header = () => (
  <header className="header">
    <nav className="header__nav nav__button">
      <button className="nav_button__more"></button>
      <button className="nav_button__trello">Trello</button>
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

const Aside = () => (
  <aside className="aside">
    <div id="aside" className="aside__container"></div>
  </aside>
);

const Main = () => (
  <main className="main">
    <div id="main" className="main__container"></div>
  </main>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__item">
        <a
          href="https://github.com/whirligigY/trello-clone"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__item__icon-git"
            src="./assets/github.svg"
            // https://github.com/whirligigY/trello-clone/blob/main-page/src/assets/github.svg
            alt="GitHub"
          />
        </a>
      </div>
      <div className="footer__item">
        <span className="footer__item__date">© 2021</span>
      </div>
      <div className="footer__item">
        <a
          href="https://rs.school/js/"
          title="Link to the course"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__item__icon-rss"
            src="./assets/rs_school_js_grey.svg"
            alt="RS School"
          />
        </a>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Aside></Aside>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
