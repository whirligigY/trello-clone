import React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DeadlineDropdownMenu() {
  const [value, onChange] = useState(new Date());
  const storDefaultEvent = (e) => {
    console.log('value1 = ', e.target);
    let newDate = new Date();
    if (Array.isArray(value)) {
      newDate = value[0];
    } else {
      newDate = value;
    }
    let month = String(newDate.getMonth() + 1);
    let day = String(newDate.getDate());
    const year = String(newDate.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    document.querySelector('.end-task-date').value = `${year}-${month}-${day}`;
  }

  const addCalendarRange = (e) => {

  }

  return (
    <Dropdown.Menu>
      <p className='deadline-text'>Deadline</p>
      <div className='label-item' id='search-label'>
      <Calendar className='calendar'
        onChange={onChange}
        value={value}
        onClickDay={storDefaultEvent}
      />
      </div>
      <p className='deadline-text'>Start date</p>
      <input className='calendar-range-toggle' type='checkbox' onChange={addCalendarRange}/>
      <input className="start-task-date" type="date" disabled></input>
      <Dropdown.Divider/>
      <p className='deadline-text'>Deadline date</p>
      <div className='deadline'>
        <input className="end-task-date" type="date"></input>
        <input className="end-task-date" type="time"></input>
      </div>
      <Dropdown.Divider className='delimiter'/>
      <Dropdown.Item as="button" id="add-check-list">Save</Dropdown.Item>
    </Dropdown.Menu>
  )
}

export { DeadlineDropdownMenu };