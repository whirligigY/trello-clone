import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from '../SideMenu/LabelDropdown/LabelsDropdownMenu';
import '../TaskModalWindow.css'
import { CurrentLabelProps } from './types';

const CurrentLabel: FC<CurrentLabelProps> = ({ item, activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="current-label"
      style={{ backgroundColor: `${item.color}` }}>
        {item.value}
      </Dropdown.Toggle>
      <LabelsDropdownMenu activeLabels={activeLabels} 
            changeActiveLabels={changeActiveLabels} 
            labels={labels} 
            changeLabels={changeLabels} 
            remove={remove}/> 
    </Dropdown>
  )
}

export { CurrentLabel };