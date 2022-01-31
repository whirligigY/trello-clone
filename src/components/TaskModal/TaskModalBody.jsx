import React, { useState } from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { TaskDescription } from './TaskDescription/TaskDescription';
import { CheckList } from './CheckList/CheckList';
import { LabelsDropdown } from './SideMenu/LabelDropdown/LabelsDropdown';
import { CheckListDropdown } from './SideMenu/CheckListDropdown';
import { DeadlineDropdown } from './SideMenu/DeadlineDropdown';
import { CurrentLabel } from './CurrentLabel';

const TaskModalBody = () => {
  const [labels, setLabels] = useState([{color: 'red', state: 'active', id: '1'}]);
  const [checkLists, setCheckList] = useState([]);
  const changeCheckList = (value) => {
    setCheckList([...checkLists, value])
  }
  const changeLabels = (value) => {
    setLabels([...labels, value]);
  }


  return (
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
              <CheckList key={i} id={`${i}`} title={item} />
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
  )
}

export { TaskModalBody };