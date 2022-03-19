import React, { useState, FC } from 'react';
import { EditForm } from './EditForm';
import '../TaskModalWindow.css';
import { TaskDescriptionProps } from './types';

const TaskDescription: FC<TaskDescriptionProps> = ({ cardId, taskDescription, setTaskDescription,}) => {
  const setHeigth = (e: React.KeyboardEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).style.height = 'inherit';
    (e.target as HTMLInputElement).style.height = `${(e.target as HTMLInputElement).scrollHeight}px`;
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
