import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';

const WorkspaceBoarModal = ({ ...props }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { user, client } = useAuth();
  const navigate = useNavigate();
  const closeHandler = () => {
    setIsComplete(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const res = await client
      .from('boards')
      .upsert([{ title, description, user_id: user.id }]);

    setIsLoading(true);
    if (res) {
      //props.handleBoardIdChange(res.data[0].id);
      navigate(`/dashboard/${res.data[0].id}`);
    }

    if (!res.error) closeHandler();
  };

  function Delay() {
    return new Promise((res) => {
      setTimeout(() => res(), 500);
    });
  }

  useEffect(() => {
    if (isLoading) {
      Delay().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={submitHandler} className="h-100">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Board
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="floatingInputGroup">
            <FloatingLabel
              controlId="floatingInput"
              label="Board Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Board Name"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </FloatingLabel>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group controlId="colse-save" className="d-flex gap-2">
            <Button onClick={props.onHide} type="reset">
              Close
            </Button>
            <Button
              variant="primary"
              //onClick={!isLoading ? handleModalData : null}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" />{' '}
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export { WorkspaceBoarModal };
