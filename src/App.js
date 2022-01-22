import NavBar from "./components/navBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Board from "./pages/board";
import Main from "./pages/main";
import Footer from "./components/footer";
import "./App.css";
import { Card } from "react-bootstrap";

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

const Main = (props) => (
  <main className="main">
    <div id="main" className="main__container">
      {props.children}
    </div>
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
        <span className="footer__item__date">© 2022</span>
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

const WorkspaceBoards = () => (
  <div class="workspace__boards">
    <h3 class="heading-h3">Workspace Boards</h3>
    <div class="workspace__boards board__list">
      <Card className="board__list__board">
        <Card.Body>Project Management</Card.Body>
      </Card>
      <div class="board__list__board board__list__board_new-board card">
        Create new board
      </div>
    </div>
  </div>
);

function App() {
  const boardList = [
    {
      id: 0,
      title: "Board1",
      board: [
        {
          id: 0,
          title: "New tasks board1",
          cards: [
            { id: 0, text: "Task01" },
            { id: 1, text: "Task02" },
          ],
        },
        {
          id: 1,
          title: "In progress",
          cards: [
            { id: 0, text: "Task11" },
            { id: 1, text: "Task12" },
          ],
        },
      ],
    },
    {
      id: 1,
      title: "Board2",
      board: [
        {
          id: 0,
          title: "New tasks board2",
          cards: [
            { id: 0, text: "Task01" },
            { id: 1, text: "Task02" },
          ],
        },
        {
          id: 1,
          title: "In progress board2",
          cards: [
            { id: 0, text: "Task11" },
            { id: 1, text: "Task12" },
          ],
        },
      ],
    },
  ];
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/:board/:boardId?" component={Board} />
          <Route path="/" component={Main} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
