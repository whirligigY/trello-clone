import React, { useState, useEffect } from 'react';
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

const TaskModalBody = ({ dateValue, changeDeadline, showDeadline, setDeadlineView, useDeadlineRange, setDeadlineRange, deadlineTime, changeDeadlineTime }) => {

  const [activeLabels, setActiveLabels] = useState([]);
  const [labels, setLabels] = useState([{id: 1, value: 'a', status: false, color: 'blue'}, {id: 2, value: '', status: false, color: 'red'}, {id: 3, value: '', status: false, color: 'yellow'}, {id: 4, value: '', status: false, color: 'green'}]);
  const [checkLists, setCheckList] = useState([]);

  const changeCheckList = (value) => {
    setCheckList([...checkLists, value])
  }

  const changeLabels = (value) => {
    if (!value.id) 
      value.id = labels.length + 1;
    if (Number(value.id) <= Number(labels.length)) {
      setLabels((prevState) => {
        return prevState.map((item) => {
          if (Number(value.id) === Number(item.id)) {
            item.id = value.id;
            item.color = value.color;
            item.status = value.status
            item.value = value.value;
          }
          return item;
        });
      });
    } else {
      setLabels([...labels, value]);
    }
  }
  
  const changeActiveLabels = (value) => {
    let index = -1;
    activeLabels.map((item) => {
      if (Number(value.id) === Number(item.id))
      {
        index = activeLabels.indexOf(item)
      }
      return item;
    })
    if (index !== -1) {
    setActiveLabels((prevState) => {
        return prevState.map((item) => {
          if (Number(value.id) === Number(item.id)) {
            item.id = value.id;
            item.color = value.color;
            item.value = value.value;
          }
          return item;
        });
      });
    } else {
      setActiveLabels([...activeLabels, value]);
    }
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
            {showDeadline && (
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
            {showDeadline && (
              <CurrentDeadline 
              dateValue={dateValue}
              changeDeadline={changeDeadline}
              setDeadlineView={setDeadlineView}
              useDeadlineRange={useDeadlineRange}
              setDeadlineRange={setDeadlineRange}
              deadlineTime={deadlineTime}
              changeDeadlineTime={changeDeadlineTime}
              />
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
              remove={removeLabel}
              filterLabels={filterLabels}/>
            <CheckListDropdown changeCheckList={changeCheckList}/>
            <DeadlineDropdown 
              dateValue={dateValue}
              changeDeadline={changeDeadline}
              setDeadlineView={setDeadlineView}
              useDeadlineRange={useDeadlineRange}
              setDeadlineRange={setDeadlineRange}
              deadlineTime={deadlineTime}
              changeDeadlineTime={changeDeadlineTime}
            />
            <CoversDropdown/>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  )
}

export { TaskModalBody };