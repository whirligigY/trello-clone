import React from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';

const LabelsDropdown = ({ labels, setLabels }) => {

  const addLabel = (e) => {
    const target = e.target;
    if (target.classList.contains('label')) {
      const item = target.id;
      setLabels([...labels, item]);
    }
  }

  return (
    <DropdownButton
      className="aside-buttons"
      variant="outline-secondary"
      title="Метки"
      id="input-group-dropdown-2"
      align="start"
    >
      <Dropdown.Item as="div" className='label-item' id='search-label'>
        <input className="search-input" type="text" placeholder="Поиск метки"></input>
      </Dropdown.Item>
      <Dropdown.Divider/>
      <div className='dropdownList' onClick={addLabel}>
        <Dropdown.Item as="div" className='label-item'>
          <div className='label' id='blue'></div>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </Dropdown.Item>
        <Dropdown.Item as="div" className='label-item'>
          <div className='label' id='red'></div>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </Dropdown.Item>
        <Dropdown.Item as="div" className='label-item'>
          <div className='label' id='yellow'></div>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </Dropdown.Item>
        <Dropdown.Item as="div" className='label-item'>
          <div className='label' id='green'></div>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </Dropdown.Item>
      </div>
      <Dropdown.Item as="button" id="add-label">Добавить метку</Dropdown.Item>
    </DropdownButton>
  )
}

export default LabelsDropdown;
