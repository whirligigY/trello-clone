import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../TaskModalWindow.css'

const CheckListDropdown = ({ changeCheckList }) => {
  const addCheckList = (e) => {
    const input = document.querySelector('.check-list-name-input');
    const name = input.value;
    console.log('name = ', name)
    changeCheckList(name);
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
        <input className="check-list-name-input" type="text" placeholder="Название" />
        <Dropdown.Divider className='delimiter'/>
        <Dropdown.Item as="button" id="add-check-list" onClick={addCheckList}>Добавить чек-лист</Dropdown.Item>
      </div>
    </DropdownButton>
  )
}

export { CheckListDropdown };
