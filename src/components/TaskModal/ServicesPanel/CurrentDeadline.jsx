import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DeadlineDropdownMenu } from '../SideMenu/DeadlineDropdown/DeadlineDropdownMenu'
import '../TaskModalWindow.css'
import moment from 'moment';

const CurrentDeadline = ({ dateValue,
  changeDeadline,
  setDeadlineView,
  useDeadlineRange,
  setDeadlineRange,
  deadlineTime,
  changeDeadlineTime,
  setSaveDeadline 
  }) => {
  return (
    <div>
      <p className="service-title">Dedline</p>
      <Dropdown>
        <Dropdown.Toggle
        variant='secondary'
        className="current-deadline"
        >
          {Array.isArray(dateValue) ? `${moment(dateValue[1]).format('DD MMM')} ${deadlineTime}` : `${moment(dateValue).format('DD MMM')} ${deadlineTime}`}
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
    </div>
  )
}

export { CurrentDeadline };