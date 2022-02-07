import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function DeadlineDropdownMenu({ dateValue, changeDeadline, setDeadlineView, useDeadlineRange, setDeadlineRange, deadlineTime, changeDeadlineTime }) {
  const addCalendarRange = () => {
    setDeadlineRange(!useDeadlineRange);
  }

  const addDeadlineTime = (e) => {
    changeDeadlineTime(e.target.value);
  }

  const addDeadline = () => 
  {
    setDeadlineView(true);
  }

  return (
    <Dropdown.Menu>
      <p className='deadline-text'>Deadline</p>
      <div className='label-item'>
        <Calendar
          value={dateValue}
          selectRange={useDeadlineRange}
          onChange={changeDeadline}
          className='calendar'
        />
      </div>
      <p className='deadline-text'>Start date</p>
      <input className='calendar-range-toggle' type='checkbox' checked={useDeadlineRange} onChange={addCalendarRange} />
      <input className="start-task start-task-date" type="text" disabled value={useDeadlineRange ? (Array.isArray(dateValue) ? moment(dateValue[0]).format('DD-MM-yyyy') :'dd-mm-yyyy') : 'dd-mm-yyyy'}/>
      <Dropdown.Divider/>
      <p className='deadline-text'>Deadline date</p>
      <div className='deadline'>
        <input className="end-task end-task-date" type="text" disabled value={Array.isArray(dateValue) ? moment(dateValue[1]).format('DD-MM-yyyy') : moment(dateValue).format('DD-MM-yyyy')} />
        <input className="end-task end-task-time" type="time" value={deadlineTime} onChange={addDeadlineTime}/>
      </div>
      <Dropdown.Divider className='delimiter'/>
      <Dropdown.Item as="button" onClick={addDeadline}>Save</Dropdown.Item>
    </Dropdown.Menu>
  )
}

export { DeadlineDropdownMenu };