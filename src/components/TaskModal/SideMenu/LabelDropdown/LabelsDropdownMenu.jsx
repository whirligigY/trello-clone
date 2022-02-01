import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import '../../TaskModalWindow.css'

const LabelsDropdownMenu = ({ labels, changeLabels, remove }) => {

  const addLabel = (e) => {
    const target = e.target;
    if (target.classList.contains('label')) {
      let active = true;
      if (target.classList.contains('active')) {
        active = false;
        target.classList.remove('active');
        const searchId = target.closest('.label-item').id;
        labels.forEach((item) => {
          if (item.id === searchId) {
            console.log()
            let index = labels.indexOf(item);
            remove(index);
          }
        })
      } else if (!target.classList.contains('active')) {
        const id = target.closest('.label-item').id;
        const color = target.id;
        const value = target.value;
        const item = {id: id, value: value, status: active, color: color}
        target.classList.add('active');
        changeLabels(item);
      }
    }
  }

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Поиск метки"></input>
      <Dropdown.Divider/>
      <div className='labels-list' onClick={addLabel}>
        <div className='label-item dropdown-item' id='1'>
          <input className='label' id='blue' disabled value='Igor Laptev'></input>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </div>
        <div className='label-item dropdown-item' id='2'>
          <input className='label' id='red' disabled></input>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </div>
        <div className='label-item dropdown-item' id='3'>
          <input className='label' id='yellow' disabled></input>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </div>
        <div className='label-item dropdown-item' id='4'>
          <input className='label' id='green' disabled></input>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </div>
        <div className='label-item dropdown-item' id='5'>
          <input className='label' id='blue' disabled value='Igor'></input>
          <Button className='edit-button' variant="outline-secondary"></Button>
        </div>
      </div>
      <Button className='dropdown-item' variant="outline-secondary" id="add-label">Add new label</Button>
    </Dropdown.Menu>
  )
}

export { LabelsDropdownMenu };


