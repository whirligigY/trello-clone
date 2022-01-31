import React from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';

const CurrentLabel = ({ labels, setLabels }) => {
  const addLabel = (e) => {
    const target = e.target;
    if (target.classList.contains('label')) {
      const item = target.id;
      setLabels([...labels, item]);
    }
  }

  return (
    <DropdownButton as={Button}
      className="current-label-button"
      // variant="outline-secondary"
      title=''
      id="current-label-button"
      align="start"
      variant="warning"
    >
      <Dropdown.Item as="div" className='label-item' id='search-label' placeholder="Поиск метки">
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

export default CurrentLabel;