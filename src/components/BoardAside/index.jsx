import styles from "./BoardAside.module.css";
import { Nav } from "react-bootstrap";

const BoardAside = () => {
  return (
    <div className={styles.dashboard_container_left + " " + styles.active}>
      <Nav defaultActiveKey="/home" className="flex-column">
        <div className={styles.workspace}>
          <Nav.Link
            eventKey="disabled"
            disabled
            className={styles.link_workspace}
          >
            User: Workspace
          </Nav.Link>
          <button className={styles.btn}>
            <i className={"bi bi-chevron-left " + styles.arrow}></i>
          </button>
        </div>

        <Nav.Link href="/home" className={styles.link}>
          <i className={"bi bi-kanban-fill " + styles.rightIconIndent}></i>
          Boards
        </Nav.Link>
        <Nav.Link eventKey="link-1" className={styles.link}>
          <i className={"bi bi-person " + styles.rightIconIndent}></i>
          Members
        </Nav.Link>
        <Nav.Link eventKey="link-2" className={styles.link}>
          <i className={"bi bi-gear-fill " + styles.rightIconIndent}></i>
          Settings
        </Nav.Link>
        <Nav.Link eventKey="disabled" disabled className={styles.link_title}>
          My boards
        </Nav.Link>
        <Nav.Link eventKey="link-2" className={styles.link}>
          board1
        </Nav.Link>
      </Nav>
    </div>
  );
};

export { BoardAside };
