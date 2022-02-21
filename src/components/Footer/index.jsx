import React from 'react';
import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__github__container">
        <div className="footer__item">
          <a
            href="https://github.com/whirligigY/trello-clone"
            target="_blank"
            rel="noreferrer"
            className="footer__item__link"
          >
            <img
              className="footer__item__icon-git"
              src="./assets/github.svg"
              // https://github.com/whirligigY/trello-clone/blob/main-page/src/assets/github.svg
              alt="GitHub whirligigY"
            />
            <p className="footer__item__icon-subscr">whirligigY</p>
          </a>
        </div>
        <div className="footer__item">
          <a
            href="https://github.com/Taneros"
            target="_blank"
            rel="noreferrer"
            className="footer__item__link"
          >
            <img
              className="footer__item__icon-git"
              src="./assets/github.svg"
              alt="GitHub Taneros"
            />
            <p className="footer__item__icon-subscr">Taneros</p>
          </a>
        </div>
        <div className="footer__item">
          <a
            href="https://github.com/IgorLap239"
            target="_blank"
            rel="noreferrer"
            className="footer__item__link"
          >
            <img
              className="footer__item__icon-git"
              src="./assets/github.svg"
              alt="GitHub Taneros"
            />
            <p className="footer__item__icon-subscr">IgorLap239</p>
          </a>
        </div>
      </div>
      <div className="footer__item">
        <div className="footer__item__date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-mortarboard-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z" />
          </svg>{' '}
          2022
        </div>
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

export default Footer;
