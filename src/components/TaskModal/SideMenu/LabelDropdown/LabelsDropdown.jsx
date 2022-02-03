import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from './LabelsDropdownMenu'

const LabelsDropdown = ({ labels, changeLabels, remove }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Labels
      </Dropdown.Toggle>
      <LabelsDropdownMenu labels={labels} changeLabels={changeLabels} remove={remove}/>
    </Dropdown>
  )
}

export { LabelsDropdown };
