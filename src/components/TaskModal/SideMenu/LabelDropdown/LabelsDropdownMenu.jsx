import React from "react";
import { Dropdown, Button } from "react-bootstrap";
import "../../TaskModalWindow.css";

function LabelsDropdownMenu({ labels, changeLabels, remove }) {
  const addLabel = (e) => {
    const { target } = e;
    if (target.classList.contains("label")) {
      let active = true;
      if (target.classList.contains("active")) {
        active = false;
        target.classList.remove("active");
        const searchId = target.closest(".label-item").id;
        labels.forEach((item) => {
          if (item.id === searchId) {
            console.log();
            const index = labels.indexOf(item);
            remove(index);
          }
        });
      } else if (!target.classList.contains("active")) {
        const { id } = target.closest(".label-item");
        const color = target.id;
        const { value } = target;
        const item = { id, value, status: active, color };
        target.classList.add("active");
        changeLabels(item);
      }
    }
  };

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Поиск метки" />
      <Dropdown.Divider />
      <div className="labels-list" onClick={addLabel}>
        <div className="label-item dropdown-item" id="1">
          <input className="label" id="blue" disabled value="Igor Laptev" />
          <Button className="edit-button" variant="outline-secondary" />
        </div>
        <div className="label-item dropdown-item" id="2">
          <input className="label" id="red" disabled />
          <Button className="edit-button" variant="outline-secondary" />
        </div>
        <div className="label-item dropdown-item" id="3">
          <input className="label" id="yellow" disabled />
          <Button className="edit-button" variant="outline-secondary" />
        </div>
        <div className="label-item dropdown-item" id="4">
          <input className="label" id="green" disabled />
          <Button className="edit-button" variant="outline-secondary" />
        </div>
        <div className="label-item dropdown-item" id="5">
          <input className="label" id="blue" disabled value="Igor" />
          <Button className="edit-button" variant="outline-secondary" />
        </div>
      </div>
      <Button
        className="dropdown-item"
        variant="outline-secondary"
        id="add-label"
      >
        Add new label
      </Button>
    </Dropdown.Menu>
  );
}

export { LabelsDropdownMenu };
