import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from './SideMenu/LabelDropdown/LabelsDropdownMenu';
import './TaskModalWindow.css'

const CurrentLabel = ({ item }) => {
  /* const addLabel = (e) => {
    const target = e.target;
    if (target.classList.contains('label')) {
      const item = target.id;
      setLabels([...labels, item]);
    }
  } */
  return (
    <Dropdown>
      <Dropdown.Toggle
      className="current-label"
      style={{ backgroundColor: `${item.color}` }}>
        {item.value}
      </Dropdown.Toggle>
      <LabelsDropdownMenu /> 
    </Dropdown>
  )
}
 /*changeLabels={changeLabels} */

export { CurrentLabel };