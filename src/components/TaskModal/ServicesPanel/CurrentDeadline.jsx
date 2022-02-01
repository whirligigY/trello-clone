import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DeadlineDropdownMenu } from '../SideMenu/DeadlineDropdown/DeadlineDropdownMenu'
import '../TaskModalWindow.css'

const CurrentDeadline = ( ) => {

  return (
    <div>
      <p className="service-title">Dedline</p>
      <Dropdown>
        <Dropdown.Toggle
        variant='secondary'
        className="current-deadline"
        >
          02 Feb, 21:00
        </Dropdown.Toggle>
        <DeadlineDropdownMenu/>
      </Dropdown>
    </div>
  )
}

export { CurrentDeadline };