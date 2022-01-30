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

export { Header };
