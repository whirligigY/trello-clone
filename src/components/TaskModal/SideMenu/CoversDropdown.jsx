import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CoversDropdown = () => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Covers
      </Dropdown.Toggle>
    </Dropdown>
  )
}

export { CoversDropdown };