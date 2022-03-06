import React, { useState, useEffect, useContext, FC } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { BgContext } from '../../contexts/BgContext';
import './WorkspaceBoardModal.css';
import { WorkspaceBoardModalProps } from './types';

const WorkspaceBoarModal: FC<WorkspaceBoardModalProps> = ({ ...props }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [background, setBackgroundImage] = useState('');
  const { changeWrapperBg } = useContext(BgContext);

  const { user, client } = useAuth();
  const navigate = useNavigate();

  const closeHandler = () => {
    setIsComplete(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const res = await client
      .from('boards')
      .upsert([
        { title, description, user_id: user.id, background: background },
      ]);

    setIsLoading(true);
    if (res) {
      getBackground(res.data[0].id);
    }

    if (!res.error) closeHandler();
  };
  const getBackground = async (id: number) => {
    const { data } = await client
      .from('boards')
      .select('background')
      .eq('id', id);
    changeWrapperBg(data[0].background);
    navigate(`/dashboard/${id}`);
  };

  function Delay() {
    return new Promise<void | void>((res, rej) => {
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

  const [unsplashCovers, setUnsplashCovers] = useState([]);
  const [inputTag, setInputTag] = useState('');

  useEffect(() => {
    downloadUnsplash();
  }, [inputTag]);

  async function downloadUnsplash() {
    let tag = 'mountain';
    if (inputTag) tag = inputTag;
    const url = `https://api.unsplash.com/search/photos?query=${tag}&per_page=31&orientation=landscape&client_id=fNbe10hInNaKsDNkqXVOAUxSkOxj1Qt_qcPHwcaFlmk`;
    const res = await fetch(url);
    const data = await res.json();
    const urlsArr = [];
    data.results.map((item) => {
      if (urlsArr.length < 40) {
        urlsArr.push(item.urls);
      }
    });
    setUnsplashCovers(urlsArr);
  }

  const changeSearchValue = (e) => {
    setInputTag(e.target.value);
  };

  const addDackground = (val) => {
    setBackgroundImage(val);
  };

  /* end */

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
          <div className="board_covers">
            <p className="deadline-text">Select background from Unsplash</p>
            <input
              className="search-input"
              type="text"
              placeholder="Search background on Unsplash"
              onChange={changeSearchValue}
            />
            <div className="covers">
              {unsplashCovers.map((item, i) => {
                return (
                  <Button
                    key={i}
                    className="cover_btn"
                    onClick={() => addDackground(item.raw)}
                  >
                    <img src={item.small} alt="" />
                  </Button>
                );
              })}
            </div>
            <p className="deadline-text">
              Photos from <a href="unsplash.com">Unsplash.com</a>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group controlId="colse-save" className="d-flex gap-2">
            <Button onClick={props.onHide} type="reset">
              Close
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
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
