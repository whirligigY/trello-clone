import React from 'react';
import { useState } from "react";
import { Form } from 'react-bootstrap';
import DiscriptionControl from './DiscriptionControl';
import './TaskModalWindow.css'



const TaskDescription = () => {
  const [textareaActive, setAreaState] = useState(false);

  const setHeigth = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div className="task-description">
      <h3>
        Описание задачи
      </h3>
      <Form.Control as="textarea" 
          className={`description-text ${textareaActive ? "" : "hover"}`} 
          rows={textareaActive ? 3 : 2} 
          placeholder="Добавьте описание задачи" 
          onFocus={() => setAreaState(true)} 
          onKeyUp={setHeigth}
          onBlur={() => setAreaState(false)}/>
          {textareaActive ? <DiscriptionControl/> : null}
    </div>
  )
}

export default TaskDescription;