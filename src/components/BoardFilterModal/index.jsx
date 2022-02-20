import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import styles from './BoardFilterModal.module.css';

const BoardFilterModal = ({ showFilter, handleClose, inputSearch }) => {
  return (
    <div
      className={
        styles.container + ' ' + (showFilter === true ? styles.visible : '')
      }
    >
      <Modal.Dialog className={styles.modal__dialog}>
        <Modal.Header closeButton onClick={(e) => handleClose(e, 'filter')}>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="flex">
            <Form.Group className="mb-3" controlId="formSearch">
              <Form.Label>Task name</Form.Label>
              <Form.Control
                type="search"
                placeholder="Enter task name"
                className="me-2"
                aria-label="Search"
                {...inputSearch}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Deadline</Form.Label>
              <Form.Check
                type="checkbox"
                label="Indefinitely"
                className={styles.checkbox}
              />
              <Form.Check
                type="checkbox"
                label="Deadline expires tomorrow"
                className={styles.checkbox}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export { BoardFilterModal };
