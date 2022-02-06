import React, { useMemo } from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

function DeadlineDropdownMenu() {
  const [value, onChange] = useState(new Date());
  const [isActiveRange, setIsActiveRange] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([]);

  const poreparedDate = useMemo(() => isActiveRange ? ({
    startDate: moment(value[0]).format('DD-MM-yyyy'),
    endDate: moment(value[1]).format('DD-MM-yyyy'),
  }) : moment(value).format('DD-MM-yyyy')
  , [value]); 

  const addCalendarRange = () => {
    setIsActiveRange(!isActiveRange);
  }

  return (
    <Dropdown.Menu>
      <p className='deadline-text'>Deadline</p>
      <div className='label-item' id='search-label'>
        <Calendar
          value={value}
          selectRange={isActiveRange}
          onChange={onChange}
          className='calendar'
        />
      </div>
      <p className='deadline-text'>Start date</p>
      <input className='calendar-range-toggle' type='checkbox' onChange={addCalendarRange} />
      <input className="end-task end-task-date" type="text" disabled={!isActiveRange} value={isActiveRange ? poreparedDate?.startDate : 'дд-мм-гггг'}/>
      <Dropdown.Divider/>
      <p className='deadline-text'>Deadline date</p>
      <div className='deadline'>
        <input className="end-task end-task-date" type="text" value={poreparedDate?.endDate ?? poreparedDate} />
        <input className="end-task end-task-time" type="time" />
      </div>
      <Dropdown.Divider className='delimiter'/>
      <Dropdown.Item as="button" id="add-check-list">Save</Dropdown.Item>
    </Dropdown.Menu>
  )
}

export { DeadlineDropdownMenu };