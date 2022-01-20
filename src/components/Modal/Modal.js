import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import TaskDescription from './TaskDescription';

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
        <Container>
          <Row>
            <Col xs={14} md={10}>
            <TaskDescription></TaskDescription>
            </Col>
            <Col xs={4} md={2}>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow;