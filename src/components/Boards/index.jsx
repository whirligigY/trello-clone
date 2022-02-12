
import { Row, Button } from 'react-bootstrap'
import './boards.css'
import { useState, useEffect } from 'react'
import WorkspaceBoards from '../Workspace'
import { useAuth } from '../../contexts/Auth'
import WorkspaceBoarModal from '../WorkspaceBoardModal'
import { Link } from 'react-router-dom'


const Boards = ({ handleBoardIdChange, ...props }) => {
  const [boards, setBoards] = useState([])
  const [modalShow, setModalShow] = useState(false)

  const { user, client } = useAuth()

  useEffect(() => {
    if (user) {
      client
        .from('boards')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            console.log(`user`, user)
            setBoards(data)
          }
        })
    }
  }, [user, modalShow, client])

  //TODO
  /**
   *
   *  justify content left how to pass modifier styles to Main?
   *
   **/

  function handleModal() {
    return setModalShow(true)
  }

  // function handleModalData(...args) {
  //   console.log(`handleModalData`, args);
  // }

  return (
    <>
      <WorkspaceBoards>
        <Row className="workspace__boards board__list">
          {console.log(`workspace boards`, boards)}
          {user ? (
            boards.map((item) => (
              <Link
                key={item.id}
                className="board__list__board card"
                to="/dashboard"
                onClick={() => handleBoardIdChange(item.id)}
              >
                <div>
                  <p>{item.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <div>
              <p>You need to sign in to view your boards.</p>
            </div>
          )}
          {user ? (
            <div className="board__list__board card card_add-new-board">
              {/* <p>Add new Board</p> */}
              <Button
                variant="light"
                className="btn-sm border border-light"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                onClick={handleModal}
              >
                Add new Board
              </Button>
            </div>
          ) : null}
        </Row>
      </WorkspaceBoards>
      {modalShow ? (
        <WorkspaceBoarModal
          show={modalShow}
          handleBoardIdChange={handleBoardIdChange}
          {...props}
          onHide={() => {
            setModalShow(false)
          }}
          // saveModalData={(...args) => handleModalData(args)}
        />
      ) : null}
    </>
  )
}

export default Boards
