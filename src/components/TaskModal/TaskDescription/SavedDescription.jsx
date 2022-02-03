import React from 'react';
import '../TaskModalWindow.css'

const SavedDescription = ({ description }) => {
  return (
    <div className="task-saved-description">
      <p>{ description }</p>
    </div>
  )
}

export { SavedDescription };