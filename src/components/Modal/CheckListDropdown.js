import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Modal.css';

const CheckListDropdown = ({ checkLists, setCheckList }) => {

  const addCheckList = (e) => {
    const input = document.querySelector('.check-list-name-input');
    const name = input.value;
    console.log('name = ', name)
    setCheckList([...checkLists, name]);
 }

  const enterName = (e) => {
    e.preventDefault();
  }

  return (
    <DropdownButton
    className="aside-buttons"
      variant="outline-secondary"
      title="Чек-лист"
      id="input-group-dropdown-2"
      align="start"
    >
      <div className='add-check-list-menu'>
        <input className="check-list-name-input" type="text" placeholder="Название" onClick={enterName}></input>
        <Dropdown.Divider className='delimiter'/>
        <Dropdown.Item as="button" id="add-check-list" onClick={addCheckList}>Добавить чек-лист</Dropdown.Item>
      </div>
    </DropdownButton>
  )
}

export default CheckListDropdown;
