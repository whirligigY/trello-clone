import { Dropdown, Button } from "react-bootstrap";
import "../../TaskModalWindow.css";

function LabelsDropdownMenu({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) {

  const addLabel = (e) => {
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
      <input className="search-input" type="text" placeholder="Search label" />
      <Dropdown.Divider />
      <div className="labels-list" onClick={addLabel}>
      {labels.map((item, i) => {
        return <div className="label-item dropdown-item" id={`${item.id}`} key={i}>
          <input className={`label ${item.status ? "active" : ""}`} id={`${item.color}`} disabled value={`${item.value}`}/>
          <Button className="edit-button" variant="outline-secondary" />
        </div>;
      })}
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
