import React, { useState, FC } from 'react';
import { EditForm } from './EditForm';
import '../TaskModalWindow.css';
import { TaskDescriptionProps } from './types';

const TaskDescription: FC<TaskDescriptionProps> = ({ cardId, taskDescription, setTaskDescription,}) => {
  const setHeigth = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="task-description">
      <div className="task-description-header">
        <h3>Task description</h3>
      </div>
      <EditForm 
        setHeigth={setHeigth}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        cardId={cardId}
      />
    </div>
  );
};

export { TaskDescription };
