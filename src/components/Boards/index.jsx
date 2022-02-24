import React, { useState, useEffect, useContext } from 'react';
import { Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import WorkspaceBoards from '../Workspace';
import { useAuth } from '../../contexts/Auth';
import { WorkspaceBoarModal } from '../WorkspaceBoardModal';

import { useKeyPress } from '../../hooks/hotKeys';
import { BgContext } from '../../contexts/BgContext';

import './boards.css';

const Boards = ({ handleBoardIdChange, ...props }) => {
  const [boards, setBoards] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const { changeWrapperBg } = useContext(BgContext);

  const { user, client, authState, userProfile } = useAuth();

  useEffect(() => {
    if (user) {
      client
        .from('boards')
        .select('*')
        .eq('user_id', user?.id)
        .order('id', { ascending: true })
        .then(({ data, error }) => {
          if (!error) {
            setBoards(data);
          }
        });
    }
  }, [user, modalShow, client]);

  const handleModal = () => setModalShow(true);
  const navigate = useNavigate();

  useKeyPress(['b'], ['Control'], handleModal);

  const getBackground = async (id) => {
    const { data } = await client
      .from('boards')
      .select('background')
      .eq('id', id);
    changeWrapperBg(data[0].background);
    navigate(`/dashboard/${id}`);
  };

  return (
    <>
      <WorkspaceBoards>
        <Row className="workspace__boards board__list">
          {userProfile()?.aud === 'authenticated' ? (
            boards.map((item) => (
              <div
                key={item.id}
                className="board__list__board card"
                onClick={() => {
                  //  handleBoardIdChange(item.id);
                  getBackground(item.id);
                }}
                role="none"
                style={{ backgroundImage: `url('${item.background}')` }}
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
          {userProfile()?.aud === 'authenticated' ? (
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
