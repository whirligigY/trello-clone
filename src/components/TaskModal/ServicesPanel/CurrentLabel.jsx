import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from '../SideMenu/LabelDropdown/LabelsDropdownMenu';
import '../TaskModalWindow.css'

const CurrentLabel = ({ item, labels, changeLabels, remove }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="current-label"
      style={{ backgroundColor: `${item.color}` }}>
        {item.value}
      </Dropdown.Toggle>
      <LabelsDropdownMenu labels={labels} changeLabels={changeLabels} remove={remove}/> 
    </Dropdown>
  )
}

export { CurrentLabel };