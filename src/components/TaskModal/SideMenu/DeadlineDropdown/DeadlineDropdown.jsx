import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DeadlineDropdownMenu } from './DeadlineDropdownMenu'

const DeadlineDropdown = ({ dateValue,
  changeDeadline,
  setDeadlineView,
  useDeadlineRange,
  setDeadlineRange,
  deadlineTime,
  changeDeadlineTime,
  setSaveDeadline }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Deadline
      </Dropdown.Toggle>
      <DeadlineDropdownMenu 
      dateValue={dateValue} 
      changeDeadline={changeDeadline}
      setDeadlineView={setDeadlineView}
      useDeadlineRange={useDeadlineRange}
      setDeadlineRange={setDeadlineRange}
      deadlineTime={deadlineTime}
      changeDeadlineTime={changeDeadlineTime}
      setSaveDeadline={setSaveDeadline}/>
    </Dropdown>
  )
}

export { DeadlineDropdown };
