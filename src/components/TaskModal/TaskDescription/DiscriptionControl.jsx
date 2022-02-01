import React from 'react';
import { Button } from 'react-bootstrap';
import '../TaskModalWindow.css'


const DiscriptionControl = ({ save, close }) => {
  const saveDiscription = () => {
    save(false);
  }

  return (
    <div className="discription-control">
      <Button className='save-task-description' onClick={saveDiscription}>Save</Button>
      <Button className="btn-close" aria-label="Close" onClick={() => close(false)}></Button>
    </div>
  )
}

export { DiscriptionControl };