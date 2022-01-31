import React from 'react';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { EditForm } from './EditForm'
import { SavedDescription } from './SavedDescription';
import '../Modal.css';

const TaskDescription = () => {
  const [textareaActive, setActiveState] = useState(false);
  const [textareaVisible, setVisibleState] = useState(true);
  const [description, setDescription] = useState('');

  const setHeigth = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const saveDescription = (value) => {
    setActiveState(value);
    setVisibleState(value)
    localStorage.setItem('description', description);
  }

  const stopEdit = (value) => {
    setActiveState(value);
    setActiveState(value);
    setDescription(localStorage.getItem('description'))
  }

  return (
    <div className="task-description">
      <div className="task-description-header">
        <h3>
          Task description
        </h3>
        {!textareaVisible && (
          <Button className='edit-task-description' variant="outline-secondary" 
          onClick={() => {
            setVisibleState(true)
            setActiveState(true)
          }}>
            Edit
          </Button>
        )}
      </div>
      {textareaVisible && (
        <EditForm 
        activeStatus={ textareaActive }
        setActiveState={ setActiveState }
        description={ description }
        setDescription={ setDescription }
        setHeigth={ setHeigth }
        saveDescription={ saveDescription }
        stopEdit={ stopEdit }
        />
      )}
      {!textareaVisible && (
        <div>
          <SavedDescription description={description}/>
        </div>
      )}
    </div>
  )
}

export { TaskDescription };