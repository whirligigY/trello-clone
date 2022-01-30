import React from 'react';
import { Button } from 'react-bootstrap';
import './Modal.css';


const DiscriptionControl = () => {
  return (
    <div className="discription-control">
      <Button>Сохранить</Button>
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>
  )
}

export default DiscriptionControl;