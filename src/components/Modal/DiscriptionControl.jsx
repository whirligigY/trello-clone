import React from 'react';
import { Button } from 'react-bootstrap';
import './Modal.css';


const DiscriptionControl = ({changeView}) => {
  const saveDiscription = () => {
    changeView(false);
    document.querySelector('.description-text').setAttribute("disabled", "true");
  }
  return (
    <div className="discription-control">
      <Button onClick={saveDiscription}>Сохранить</Button>
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>
  )
}

export default DiscriptionControl;