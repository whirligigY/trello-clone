import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import styles from './BoardNavigation.module.css';

const BoardNavigation = ({ title }) => {
  return (
    <Navbar variant="light" className={styles.bg_opacity}>
      <Container fluid>
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Board</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Board</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Board</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Nav.Link href="#action1">Filter</Nav.Link>
        <Nav.Link href="#action1">Menu</Nav.Link>
      </Container>
    </Navbar>
  );
};

export { BoardNavigation };
