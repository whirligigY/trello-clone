import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalWindow = () => {
  return (
    <Modal show={true}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          CardName
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow;