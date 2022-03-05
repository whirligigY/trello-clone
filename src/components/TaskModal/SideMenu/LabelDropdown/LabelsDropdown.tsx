import React, { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LabelsDropdownMenu } from './LabelsDropdownMenu'
import { LabelsDropdownProps } from './types'

const LabelsDropdown: FC<LabelsDropdownProps> = ({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {

  return (
    <Dropdown>
      <Dropdown.Toggle
      className="aside-buttons"
      variant="outline-secondary"
      >
        Labels
      </Dropdown.Toggle>
      <LabelsDropdownMenu 
        activeLabels={activeLabels}
        changeActiveLabels={changeActiveLabels}
        labels={labels}
        changeLabels={changeLabels}
        remove={remove}
        />
    </Dropdown>
  )
}

export { LabelsDropdown };
