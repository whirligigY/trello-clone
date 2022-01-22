import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { useLabels } from './Hooks/useLabels';
import { useCheckLists } from './Hooks/useCheckLists';
import TaskDescription from './TaskDescription';
import CheckList from './CheckList';
import LabelsDropdown from './LabelsDropdown';
import CheckListDropdown from './CheckListDropdown';
import CurrentLabel from './CurrentLabel';

const ModalWindow = () => {
  const labels = useLabels();
  const checkLists = useCheckLists();

  return (
    <Modal show={true}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
      <div className="header-content d-flex flex-column">
        <Modal.Title>
        CardName
        </Modal.Title>
        <p className="text-start">
        в колонке <a href="#" className="link-secondary">Column Name</a>
        </p>
      </div>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className='content'>
            <Col xs={14} md={10} className='main-content'>
            <div className="current-labels">
              { labels.labels.map((item, i) => 
                <div className="current-label" key={i}>
                  <CurrentLabel { ...labels } />
                  <div className="current-label-content" style={{backgroundColor:`${item}`}}></div>
                </div>
              )}
            </div>
            <TaskDescription/>
            { checkLists.checkLists.map((item, i) => 
                <CheckList key={i} id={`${i}`} { ...checkLists }/>
              )}
            </Col>
            <Col className="side-buttons" xs={4} md={2}>
              <LabelsDropdown { ...labels }/>
              <CheckListDropdown { ...checkLists }/>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow;