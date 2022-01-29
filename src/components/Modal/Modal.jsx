import React, { useState } from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import TaskDescription from './TaskDescription';
import CheckList from './CheckList';
import LabelsDropdown from './LabelsDropdown';
import CheckListDropdown from './CheckListDropdown';
import DeadlineDropdown from './DeadlineDropdown';
import CurrentLabel from './CurrentLabel';


const ModalWindow = () => {
  const [labels, setLabels] = useState([]);
  const [checkLists, setCheckList] = useState([]);
  const changeCheckList = (value) => {
    setCheckList([...checkLists, value])
  }
  const changeLabels = (value) => {
    setLabels([...labels, value]);
  }


  return (
    <Modal show={true}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header closeButton>
      <div className="header-content d-flex flex-column">
        <Modal.Title>
        Название карточки
        </Modal.Title>
        <p className="text-start">
        в колонке <a href="#" className="link-secondary">название колонки</a>
        </p>
      </div>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className='content'>
            <Col xs={14} md={10} className='main-content'>
            <div className="current-labels">
              { labels.map((item, i) => 
                <div className="current-label" key={i}>
                  <CurrentLabel labels={labels} setLabels={setLabels} />
                  <div className="current-label-content" style={{backgroundColor:`${item}`}}></div>
                </div>
              )}
            </div>
            <TaskDescription/>
            { checkLists.map((item, i) => 
                <CheckList key={i} id={`${i}`} checkLists={checkLists}/>
              )}
            </Col>
            <Col className="side-buttons" xs={4} md={2}>
              <LabelsDropdown labels={labels} changeLabels={changeLabels}/>
              <CheckListDropdown changeCheckList={changeCheckList}/>
              <DeadlineDropdown/>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow;