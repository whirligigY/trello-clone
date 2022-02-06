import { Modal, Form, FormControl } from "react-bootstrap";
import styles from "./BoardFilterModal.module.css";

const BoardFilterModal = ({ showFilter, handleClose }) => {
  return (
    <div
      className={
        styles.container + " " + (showFilter === true ? styles.visible : "")
      }
    >
      <Modal.Dialog className={styles.modal__dialog}>
        <Modal.Header closeButton onClick={(e) => handleClose(e, "filter")}>
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Members</Form.Label>
              <Form.Check
                type="checkbox"
                label="  Member 1"
                className={styles.checkbox}
              />
              <Form.Check
                type="checkbox"
                label="  Member 2"
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
