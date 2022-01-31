import React from 'react';
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { DiscriptionControl } from './DiscriptionControl';
import '../Modal.css';

const TaskDescription = () => {
  const [textareaActive, setAreaState] = useState(false);

  const setHeigth = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const changeControlView = (value) => {
    setAreaState(value)
    document.querySelector('.description-text').setAttribute("disabled", "true");
  }

  return (
    <div className="task-description">
      <h3>
        Описание задачи
      </h3>
      <Button variant="secondary">Изменить</Button>
      <Form.Control as="textarea" 
          className={`description-text ${textareaActive ? "" : "hover"}`} 
          rows={textareaActive ? 3 : 2} 
          placeholder="Добавьте описание задачи" 
          onFocus={() => setAreaState(true)} 
          onKeyUp={setHeigth}
          /*onBlur={() => setAreaState(false)}*/
          />
          {textareaActive && ( <DiscriptionControl changeView={changeControlView}/> )}
          {textareaActive && ( null )}
    </div>
  )
}

export { TaskDescription };