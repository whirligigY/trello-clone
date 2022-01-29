import React from 'react';
import { useState } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DeadlineDropdown = () => {

  const [value, onChange] = useState(new Date());
  const storDefaultEvent = (e) => {
    console.log('value1 = ', e.target);
    let newDate = new Date();
    if (Array.isArray(value)) {
      newDate = value[0];
    } else {
      newDate = value;
    }
    console.log('value = ', newDate);
    let month = String(newDate.getMonth() + 1);
    let day = String(newDate.getDate());
    const year = String(newDate.getFullYear());
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log('value = ', `${month}.${day}.${year}`);
    document.querySelector('.end-task-date').value = `${year}-${month}-${day}`;
  }

  const addCalendarRange = (e) => {
    console.log('range = ', document.querySelector('.calendar').selectRange)
    /* if (e.target.checked) {
      document.querySelector('.calendar').setAttribute("selectRange", "true");;
      document.querySelector('.start-task-date').removeAttribute("disabled");
      console.log('range = ', document.querySelector('.calendar').selectRange)
    } else {
      document.querySelector('.calendar').removeAttribute("selectRange");
      document.querySelector('.start-task-date').setAttribute("disabled", "true");
      console.log('range = ', document.querySelector('.calendar').selectRange)
    } */
  }

  return (
    <DropdownButton
      className="aside-buttons"
      variant="outline-secondary"
      title="Сроки"
      id="input-group-dropdown-2"
      align="start"
    >
      <p className='deadline-text'>Срок</p>
      <div className='label-item' id='search-label'>
      <Calendar className='calendar'
        onChange={onChange}
        value={value}
        onClickDay={storDefaultEvent}
        // selectRange={false}
      />
      </div>
      <p className='deadline-text'>Дата начала</p>
      <input className='calendar-range-toggle' type='checkbox' onChange={addCalendarRange}/>
      <input className="start-task-date" type="date" disabled></input>
      <Dropdown.Divider/>
      <p className='deadline-text'>Дата окончания</p>
      <div className='deadline'>
        <input className="end-task-date" type="date"></input>
        <input className="end-task-date" type="time"></input>
      </div>
      <Dropdown.Divider className='delimiter'/>
      <Dropdown.Item as="button" id="add-check-list">Сохранить</Dropdown.Item>
    </DropdownButton>
  )
}

export default DeadlineDropdown;
