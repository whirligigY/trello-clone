import React, { useState } from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { TaskDescription } from './TaskDescription/TaskDescription';
import { CheckList } from './CheckList/CheckList';
import { LabelsDropdown } from './SideMenu/LabelDropdown/LabelsDropdown';
import { CheckListDropdown } from './SideMenu/CheckListDropdown';
import { DeadlineDropdown } from './SideMenu/DeadlineDropdown/DeadlineDropdown';
import { MembersDropdown } from './SideMenu/MembersDropdown/MembersDropdown';
import { CoversDropdown } from './SideMenu/CoversDropdown';
import { CurrentLabels } from './ServicesPanel/CurrentLabels';
import { CurrentDeadline } from './ServicesPanel/CurrentDeadline';
import { CurrentMembers } from './ServicesPanel/CurrentMembers';

const TaskModalBody = () => {
  const [activeLabels, setActiveLabels] = useState([]);
  const [labels, setLabels] = useState([{id: 1, value: '', status: false, color: 'blue'}, {id: 2, value: '', status: false, color: 'red'}, {id: 3, value: '', status: false, color: 'yellow'}, {id: 4, value: '', status: false, color: 'green'}]);
  const [checkLists, setCheckList] = useState([]);
  const [deadline, setDeadline] = useState(true);

  const changeCheckList = (value) => {
    setCheckList([...checkLists, value])
  }
  const changeLabels = (value) => {
    setLabels((prevState)=>{
      return prevState.map((item) => {
        if (Number(value.id) === Number(item.id)) {
          item.id = value.id;
          item.status = value.status;
          item.color = value.color;
          item.value = value.value;
        }
        return item;
      });
    });
  }
  const changeActiveLabels = (value) => {
    setActiveLabels([...activeLabels, value]);
  }
  const removeLabel = (value) => {
    setActiveLabels([
      ...activeLabels.slice(0, value),
      ...activeLabels.slice(value + 1)
    ]);
  }

  return (
    <Modal.Body>
      <Container>
        <Row className='content'>
          <Col xs={14} md={10} className='main-content'>
          <div className='services-content'>
            {deadline && (
              <CurrentMembers/>
            )}
            {activeLabels.length > 0 && (
              <CurrentLabels 
              activeLabels={activeLabels}
              changeActiveLabels={changeActiveLabels}
              labels={labels}
              changeLabels={changeLabels}
              remove={removeLabel}/>
            )}
            {deadline && (
              <CurrentDeadline/>
            )}
          </div>
          <TaskDescription/>
          { checkLists.map((item, i) => 
              <CheckList key={i} id={`${i}`} title={item} />
            )}
          </Col>
          <Col className="side-buttons" xs={4} md={2}>
            <MembersDropdown/>
            <LabelsDropdown 
              activeLabels={activeLabels}
              changeActiveLabels={changeActiveLabels}
              labels={labels}
              changeLabels={changeLabels}
              remove={removeLabel}/>
            <CheckListDropdown changeCheckList={changeCheckList}/>
            <DeadlineDropdown/>
            <CoversDropdown/>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  )
}

export { TaskModalBody };