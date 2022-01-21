import React from 'react';
import { useState } from "react";
import { ProgressBar, Button, InputGroup, FormControl } from 'react-bootstrap';
import './Modal.css';



const CheckList = () => {
  const [checkboxes, setCheckItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const [checked, setCheck] = useState(1);

  const item = false;
  const addCheckBox = () => {
    setCheckItems([...checkboxes, item]);
    if (progress !== 0) {
      const checkCount = Math.round(progress/(100/checkboxes.length));
      setProgress(Math.round(100/(checkboxes.length + 1)) * checkCount);
    }
  };

  const changeProgress = (e) => {
    if (e.target.checked) {
      setCheck(checked + 1);
      setProgress(progress + Math.round(100/checkboxes.length));
      if (checked === (checkboxes.length)) {
        setProgress(100);
      }
    } else {
      setCheck(checked - 1);
      setProgress(progress - Math.round(100/checkboxes.length));
      const checkCount = Math.round(progress/(100/checkboxes.length));
      if (checkCount - 1 === 0) {
        setProgress(0);
      }
    }
  }

  return (
    <div className="check-list">
      <h3>
        Чек-лист
      </h3>
      <ProgressBar striped now={progress} label={`${progress}%`} max={100}/>
        <div className="check-list-items"></div>
        {checkboxes.length ?
        <div className="check-list-items">
          { checkboxes.map((item, i) => 
          <InputGroup className="mb-3" key={i}>
            <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={changeProgress}/>
            <FormControl aria-label="Text input with checkbox"/>
          </InputGroup>)}
        </div> : 
        null}
      <Button className="add-checkbox" variant="secondary" onClick={addCheckBox}>Добавить элемент</Button>
    </div>
  )
}

export default CheckList;