import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
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

  const removeDeadline = () => 
  {
    setDeadlineView(false);
    changeDeadlineTime('');
    changeDeadline(new Date());
    setDeadlineRange(false);
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
          locale='en-En'
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
      <Dropdown.Item as="button" id='save-deadline' onClick={addDeadline}>
        Save
      </Dropdown.Item>
      <Dropdown.Item as="button" id='delete-deadline' onClick={removeDeadline}>
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}

export { DeadlineDropdownMenu };