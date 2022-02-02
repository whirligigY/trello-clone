import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { MembersDropdownMenu } from './MembersDropdownMenu'

const MembersDropdown = () => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Members
      </Dropdown.Toggle>
      <MembersDropdownMenu/>
    </Dropdown>
  )
}

export { MembersDropdown };