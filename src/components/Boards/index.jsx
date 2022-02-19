import React, { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import WorkspaceBoards from '../Workspace';
import { useAuth } from '../../contexts/Auth';
import { WorkspaceBoarModal } from '../WorkspaceBoardModal';

import { useKeyPress } from '../../hooks/hotKeys';

import './boards.css';

const Boards = ({ handleBoardIdChange, ...props }) => {
  const [boards, setBoards] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const { user, client, authState } = useAuth();

  useEffect(() => {
    if (user) {
      client
        .from('boards')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            console.log(`user`, user);
            setBoards(data);
          }
        });
    }
  }, [user, modalShow, client]);

  const handleModal = () => setModalShow(true);
  const navigate = useNavigate();

  useKeyPress(['b'], ['Control'], handleModal);

  return (
    <>
      <WorkspaceBoards>
        <Row className="workspace__boards board__list">
          {authState() === 'authenticated' ? (
            boards.map((item) => (
              <div
                key={item.id}
                className="board__list__board card"
                onClick={() => {
                  //  handleBoardIdChange(item.id);
                  navigate(`/dashboard/${item.id}`);
                }}
                role="none"
              >
                <div>
                  <p>{item.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>You need to sign in to view your boards.</p>
            </div>
          )}
          {authState() === 'authenticated' ? (
            <div className="board__list__board card card_add-new-board">
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
            setModalShow(false);
          }}
          // saveModalData={(...args) => handleModalData(args)}
        />
      ) : null}
    </>
  );
};

export default Boards;
