import React from 'react';
import {Modal} from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <Modal show={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
        <Modal.Header>
          <Modal.Title>
            CardName
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>
    )
  }
}

export default App;
