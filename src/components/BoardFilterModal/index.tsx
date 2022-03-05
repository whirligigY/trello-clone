import React, { FC } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { BoardFilterModalProps } from './index.props';
import styles from './BoardFilterModal.module.css';

const BoardFilterModal: FC<BoardFilterModalProps> = ({
  showFilter,
  handleClose,
  inputSearch,
}) => {
  return (
    <div
      className={
        styles.container + ' ' + (showFilter === true ? styles.visible : '')
      }
    >
      <Modal.Dialog className={styles.modal__dialog}>
        <Modal.Header closeButton onClick={(e) => handleClose('filter')}>
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
                value={inputSearch.value}
                onChange={inputSearch.onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export { BoardFilterModal };
