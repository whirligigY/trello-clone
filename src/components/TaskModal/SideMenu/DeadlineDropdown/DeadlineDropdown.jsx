import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DeadlineDropdownMenu } from './DeadlineDropdownMenu'

const DeadlineDropdown = () => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Dedline
      </Dropdown.Toggle>
      <DeadlineDropdownMenu/>
    </Dropdown>
  )
}

export { DeadlineDropdown };
