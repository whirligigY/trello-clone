import { useState, useEffect } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useAuth } from '../../contexts/Auth'
import { Redirect } from 'react-router-dom'

export default function WorkspaceBoarModal({ ...props }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const { user, client } = useAuth()

  async function submitHandler(event) {
    event.preventDefault()
    // props.saveModalData(title);
    const res = await client
      .from('boards')
      .upsert([{ title, description, user_id: user.id }])

    setIsLoading(true)
    if (res) {
      props.handleBoardIdChange(res.data[0].id)
    }

    if (res.error) {
    } else {
      closeHandler()
    }
  }

  const closeHandler = () => {
    setIsComplete(false)
  }

  function Delay() {
    return new Promise((res, rej) => {
      console.log(`delay start`)
      setTimeout(() => res(), 500)
    })
  }

  useEffect(() => {
    if (isLoading) {
      Delay().then(() => {
        console.log(`delay end`)
        setIsLoading(false)
      })
    }
  }, [isLoading])

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
              // onClick={!isLoading ? handleModalData : null}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm"></span>{' '}
                  Saving...
                  <Redirect to={`/dashboard`} />
                </>
              ) : (
                'Save'
              )}
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
