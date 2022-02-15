import React from 'react';
import './aside.css';

const Aside = () => (
  <aside className="aside">
    <div id="aside" className="aside__container">
      <div className="bg-light border rounded-3 p-1 h-100 sticky-top">
        <ul className="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate">
          <li className="nav-item">
            <a href="/#" className="nav-link px-2 text-truncate">
              <i className="bi bi-house fs-5" />
              <span className="d-none d-sm-inline ms-1">Home</span>
            </a>
          </li>

          <li>
            <a href="/#" className="nav-link px-2 text-truncate">
              <i className="bi bi-card-text fs-5" />
              <span className="d-none d-sm-inline ms-1">Templates</span>{' '}
            </a>
          </li>
          <li>
            <a href="/#" className="nav-link px-2 text-truncate">
              <i className="bi bi-clipboard" />
              <span className="d-none d-sm-inline ms-1">Boards</span>{' '}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
);

export default Aside;
