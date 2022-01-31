import React from 'react';
import '../Modal.css';

const SavedDescription = ({ description }) => {
  return (
    <div className="task-saved-description">
      <p>{ description }</p>
    </div>
  )
}

export { SavedDescription };