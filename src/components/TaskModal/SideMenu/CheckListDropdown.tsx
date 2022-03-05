import React, { FC } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../TaskModalWindow.css'
import { CheckListDropdownProps } from './types'


const CheckListDropdown: FC<CheckListDropdownProps> = ({ changeCheckList }) => {
  const addCheckList = () => {
    const input = document.querySelector('.check-list-name-input') as HTMLInputElement;
    const name = input.value;
    changeCheckList(name);
    input.value = '';
 }

  return (
    <DropdownButton
      className="aside-buttons"
      variant="outline-secondary"
      title="Check-list"
      id="input-group-dropdown-2"
      align="start"
    >
      <div className='add-check-list-menu'>
        <input className="check-list-name-input" type="text" placeholder="Name"/>
        <Dropdown.Divider className='delimiter'/>
        <Dropdown.Item as="button" id="add-check-list" onClick={addCheckList}>Add check-list</Dropdown.Item>
      </div>
    </DropdownButton>
  )
}

export { CheckListDropdown };
