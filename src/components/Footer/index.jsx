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

export { Footer };
