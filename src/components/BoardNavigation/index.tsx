import React, { FC } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import styles from './BoardNavigation.module.css';
import { BoardFilterModal } from '../BoardFilterModal';
import { useToggleModal } from '../../pages/DashboardPage/hooks';
import { BoardNavigationProps } from './index.props';

const BoardNavigation: FC<BoardNavigationProps> = ({ title, inputSearch }) => {
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
      </Container>
    </Navbar>
  );
};

export { BoardNavigation };
