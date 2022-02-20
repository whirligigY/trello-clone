import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import styles from './BoardNavigation.module.css';
import { BoardFilterModal } from '../BoardFilterModal';
import { useToggleModal } from '../../pages/DashboardPage/hooks';

const BoardNavigation = ({ title, inputSearch }) => {
  const { showFilter, handleShow, handleClose } = useToggleModal();

  return (
    <Navbar variant="light" className={styles.navigation}>
      <Container fluid>
        <Navbar.Brand className={styles.link}>{title}</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav" />

        <Nav.Link
          className={`${styles.rightIndent} ${styles.link}`}
          onClick={() => handleShow('filter')}
        >
          <i className={`bi bi-filter ${styles.rightIconIndent}`} />
          Filter
        </Nav.Link>
        <BoardFilterModal
          showFilter={showFilter}
          handleClose={handleClose}
          inputSearch={inputSearch}
        />
        <Nav.Link className={styles.link}>
          <i className={`bi bi-three-dots ${styles.rightIconIndent}`} />
          Menu
        </Nav.Link>
      </Container>
    </Navbar>
  );
};

export { BoardNavigation };
