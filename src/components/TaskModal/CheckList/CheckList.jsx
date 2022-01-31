import React from 'react';
import { useState } from "react";
import { ProgressBar, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../Modal.css';


let counter = 0;

const CheckList = ({ title }) => {
  const [checkboxes, setCheckItems] = useState([]);
  const [progress, setProgress] = useState(0);

  const addCheckBox = () => {
    setCheckItems((prevState)=>{
      return [...prevState, {title: '', id: prevState.length + 1}];
    });
    if (progress !== 0) {
      const checkCount = Math.round(progress/(100/checkboxes.length));
      setProgress(Math.round(100/(checkboxes.length + 1)) * checkCount);
    }
  };

  const onChange = (e, id) => {
    setCheckItems((prevState) => {
      // TODO: найти элемент с id и изменить его title
      return [];
    })
  }

  const removeCheckBox = () => {
    setCheckItems([...checkboxes.slice(0, checkboxes.length - 1)]);
    if (progress !== 0) {
      const checkCount = Math.round(progress/(100/checkboxes.length));
      setProgress(Math.round(100/(checkboxes.length + 1)) * checkCount);
    }
  };

  const changeProgress = (e) => {
    if (e.target.checked) {
      counter += 1;
      setProgress(Math.round(counter/checkboxes.length * 100));
      if (counter === (checkboxes.length)) {
        setProgress(100);
      }
    } else {
      counter -= 1;
      setProgress(Math.round(counter/checkboxes.length * 100));
      const checkCount = Math.round(progress/(100/checkboxes.length));
      if (checkCount - 1 === 0) {
        setProgress(0);
      }
    }
  }

  const removeCheckList = (e) => {
    e.target.closest('.check-list').remove();
  }

  const removeCheckListItem = (e) => {
    e.target.closest('.subtask').remove();
    // removeCheckBox();
  }

  return (
    <div className="check-list">
      <div className='check-list-header'>
        <h3>
          {title}
        </h3>
        <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckList}>Удалить</Button>
      </div>
      <ProgressBar striped now={progress} label={`${progress}%`} max={100}/>
        <div className="check-list-items"></div>
        {checkboxes.length && (
          <div className="check-list-items">
            { checkboxes.map((item, i) => 
            <InputGroup className="mb-3 subtask" key={i}>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={changeProgress}/>
              <FormControl aria-label="Text input with checkbox"/>
              <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckListItem}>Удалить</Button>
            </InputGroup>
            )}
          </div>
        )}
        {checkboxes.length && ( null )}
      <Button className="add-checkbox" variant="secondary" onClick={addCheckBox}>Добавить элемент</Button>
    </div>
  )
}

export { CheckList };