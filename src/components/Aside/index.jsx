import "./aside.css";

const Aside = () => (
  <aside className="aside">
    <div id="aside" className="aside__container">
      <div class="bg-light border rounded-3 p-1 h-100 sticky-top">
        <ul class="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-truncate">
              <i class="bi bi-house fs-5"></i>
              <span class="d-none d-sm-inline ms-1">Home</span>
            </a>
          </li>

          <li>
            <a href="#" class="nav-link px-2 text-truncate">
              <i class="bi bi-card-text fs-5"></i>
              <span class="d-none d-sm-inline ms-1">Templates</span>{" "}
            </a>
          </li>
          <li>
            <a href="#" class="nav-link px-2 text-truncate">
              <i class="bi bi-clipboard"></i>
              <span class="d-none d-sm-inline ms-1">Boards</span>{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
);

export default Aside;
