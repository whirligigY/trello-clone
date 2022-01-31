import React from 'react';
import { Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { TaskModalBody } from './TaskModalBody'



const TaskModalWindow = ({ visible, closeHandle }) => {

  return (
    <Modal show={visible}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton onClick={closeHandle}>
      <div className="header-content d-flex flex-column">
        <Modal.Title>
        Card name
        </Modal.Title>
        <p className="text-start">
        in column <a href="#" className="link-secondary">column name</a>
        </p>
      </div>
      </Modal.Header>
      <TaskModalBody/>
    </Modal>
  )
}

export { TaskModalWindow };