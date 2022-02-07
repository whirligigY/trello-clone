import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import styles from "./BoardNavigation.module.css";
import { BoardFilterModal } from "../BoardFilterModal";
import { useToggleModal } from "../../pages/DashboardPage/hooks";

const BoardNavigation = ({ title }) => {
  const { showFilter, showMenu, handleShow, handleClose } = useToggleModal();
  return (
    <Navbar variant="light" className={styles.navigation}>
      <Container fluid>
        <Navbar.Brand className={styles.link}>{title}</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>

        <Nav.Link
          className={styles.rightIndent + " " + styles.link}
          onClick={() => handleShow("filter")}
        >
          <i className={"bi bi-filter " + styles.rightIconIndent}></i>
          Filter
        </Nav.Link>
        <BoardFilterModal showFilter={showFilter} handleClose={handleClose} />
        <Nav.Link className={styles.link}>
          <i className={"bi bi-three-dots " + styles.rightIconIndent}></i>
          Menu
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export { BoardNavigation };
