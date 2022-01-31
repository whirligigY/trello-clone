import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';

const LabelsDropdownMenu = ({ labels, changeLabels }) => {

  const addLabel = (e) => {
    const target = e.target;
    if (target.classList.contains('label')) {
      const item = target.id;
      changeLabels(item);
    }
  }

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Поиск метки"></input>
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
    </Dropdown.Menu>
  )
}

export { LabelsDropdownMenu };


