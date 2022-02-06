import React, { useState, useEffect } from 'react';
import { ProgressBar, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../TaskModalWindow.css'

const CheckList = ({ title }) => {
  const [checkboxes, setCheckItems] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect (
    () => {
      if (checkedCheckboxes.length === 0) {
        setProgress(0);
      } else if (checkedCheckboxes.length === checkboxes.length) {
        setProgress(100);
      } else {
        setProgress(Math.round(checkedCheckboxes.length/checkboxes.length * 100));
      }
    },
    [checkedCheckboxes, checkboxes]
  );
  
  const addCheckBox = () => {
    setCheckItems((prevState)=>{
      return [...prevState, {title: '', id: prevState[prevState.length-1] ? prevState[prevState.length-1].id + 1 : 1, status: false}];
    });
    if (progress !== 0) {
      const checkCount = Math.round(progress/(100/checkboxes.length));
      setProgress(Math.round(100/(checkboxes.length + 1)) * checkCount);
    }
  };

  const onChange = (e) => {
    const id = e.target.closest('.subtask').id;
    const value = e.target.value;
    setCheckItems((prevState)=>{
      return prevState.map((item) => {
        if (Number(id) === Number(item.id)) {
          item.title = value;
        }
        return item;
      });
    });
  }

  const removeCheckBox = (id) => {
    let index = 0;
    checkboxes.map((item) => {
      if (Number(item.id) === Number(id)) {
        index = checkboxes.indexOf(item);
      }
      return item;
    })
    setCheckItems([
      ...checkboxes.slice(0, index),
      ...checkboxes.slice(index + 1)
    ]);
  };

  const changeProgress = (e) => {
    const id = e.target.closest('.subtask').id;
    if (e.target.checked) {
      setCheckedCheckboxes([...checkedCheckboxes, id])
      setCheckItems((prevState)=>{
        return prevState.map((item) => {
          if (Number(id) === Number(item.id)) {
            item.status = true;
          }
          return item;
        });
      });
    } else {
      const index = checkedCheckboxes.indexOf(id);
      setCheckedCheckboxes([
        ...checkedCheckboxes.slice(0, index),
        ...checkedCheckboxes.slice(index + 1)
      ]);
      setCheckItems((prevState)=>{
        return prevState.map((item) => {
          if (Number(id) === Number(item.id)) {
            item.status = false;
          }
          return item;
        });
      });
    }
  }

  const removeCheckList = (e) => {
    e.target.closest('.check-list').remove();
  }

  const removeCheckListItem = (e) => {
    const id = e.target.closest('.subtask').id;
    const index = checkedCheckboxes.indexOf(id);
    if (index !== -1) {
      setCheckedCheckboxes([
        ...checkedCheckboxes.slice(0, index),
        ...checkedCheckboxes.slice(index + 1)
      ]);
    }
    removeCheckBox(id);
  }

  return (
    <div className="check-list">
      <div className='check-list-header'>
        <h3>
          {title}
        </h3>
        <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckList}>Remove</Button>
      </div>
      <ProgressBar striped now={progress} label={`${progress}%`} max={100}/>
        {checkboxes.length != 0 && (
          <div className="check-list-items">
            { checkboxes.map((item, i) => {
            return <InputGroup className="mb-3 subtask" key={i} id={item.id}>
              <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={item.status} onChange={changeProgress}/>
              <FormControl aria-label="Text input with checkbox" value={item.title} onChange={onChange}/>
              <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckListItem}>Remove</Button>
            </InputGroup>
            }
            )}
          </div>
        )}
        {checkboxes.length == 0 && ( null )}
      <Button className="add-checkbox" variant="secondary" onClick={addCheckBox}>Add element</Button>
    </div>
  )
}

export { CheckList };