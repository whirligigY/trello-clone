import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from './LabelsDropdownMenu'

const LabelsDropdown = ({ labels, changeLabels }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      /*style={{ backgroundColor: 'red' }}*/>
        Labels
      </Dropdown.Toggle>
      <LabelsDropdownMenu labels={labels} changeLabels={changeLabels}/>
    </Dropdown>
  )
}

export { LabelsDropdown };
