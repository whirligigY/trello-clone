import React from 'react';
import { useState } from "react";
import { Form } from 'react-bootstrap';
import './Modal.css';



const TaskDescription = () => {
  const [bgColor, setActiv] = useState(false);

  const setHeigth = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <div class="task-description">
      <h3>
        Описание задачи
      </h3>
      <Form.Control as="textarea" className={`description-text ${bgColor ? "yellow" : ""}`} rows={2} placeholder="Добавьте описание задачи" onClick={() => setActiv(!bgColor)} onKeyUp={setHeigth}/>
    </div>
  )
}

export default TaskDescription;