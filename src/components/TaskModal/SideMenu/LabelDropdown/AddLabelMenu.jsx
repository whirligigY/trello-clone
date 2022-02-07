import React from 'react';
import { Dropdown, Button } from "react-bootstrap";
import "../../TaskModalWindow.css";

const AddLabelMenu = ({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {

  const addNewLabel = (e) => {
    const { target } = e;
    if (target.classList.contains("label")) {
      let active = true;
      const { id }= target.closest(".label-item");
      if (target.classList.contains("active")) {
        active = false;
        activeLabels.forEach((item) => {
          if (item.id === id) {
            const index = activeLabels.indexOf(item);
            remove(index);
          }
        });
      }
      const color = target.id;
      const { value } = target;
      const newItem = { id, value, status: active, color };
      changeLabels(newItem);
      if (!target.classList.contains("active")) {
        changeActiveLabels(newItem);
      }
    }
  };

  return (
    <Dropdown.Menu>
      <input className="label-name-input" type="text" placeholder="Label name" />
      <Dropdown.Divider />
      <div className='labels-colors'>
        <div className={`rectangle`} id='blue'/>
        <div className={`rectangle`} id='yellow'/>
        <div className={`rectangle`} id='red'/>
        <div className={`rectangle`} id='green'/>
        <div className={`rectangle`} id='darkorchid'/>
        <div className={`rectangle`} id='orange'/>
        <div className={`rectangle`} id='deepskyblue'/>
        <div className={`rectangle`} id='sandybrown'/>
        <div className={`rectangle`} id='plum'/>
        <div className={`rectangle`} id='khaki'/>
      </div>
    </Dropdown.Menu>
  );
}

export { AddLabelMenu };