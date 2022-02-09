import React from 'react';
import { Dropdown, Button } from "react-bootstrap";
import { AddLabelMenu } from './AddLabelMenu'
import "../../TaskModalWindow.css";

const LabelsDropdownMenu = ({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {
  // TODO: Пример как реализваоть поиск

  // const [search, setSearch] = useState();
  // const preparedLables = useMemo(() => search ? labels.filter(() => {
  //     // todo: ..)
  //   }) : labels
  // , [search]);

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
      const color = target.dataset.color;
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
          <input className={`label ${item.status ? "active" : ""} ${item.color}`} disabled value={`${item.value}`} data-color={`${item.color}`}/>
          <Dropdown>
            <Dropdown.Toggle
              className="edit-button"
              >
            </Dropdown.Toggle>
            <AddLabelMenu
              id={item.id}
              title={item.value}
              itemColor={item.color}
              itemStatus={item.status}
              activeLabels={activeLabels}
              changeActiveLabels={changeActiveLabels}
              labels={labels}
              changeLabels={changeLabels}
              remove={remove}/>
          </Dropdown>
        </div>;
      })}
      </div>
      <Dropdown.Divider />
      <Dropdown>
        <Dropdown.Toggle
          className="dropdown-item"
          variant="primary"
          id="add-new-label"
          >
          Add new label
        </Dropdown.Toggle>
        <AddLabelMenu
          id={''}
          title={''}
          itemColor={''}
          itemStatus={false}
          activeLabels={activeLabels}
          changeActiveLabels={changeActiveLabels}
          labels={labels}
          changeLabels={changeLabels}
          remove={remove}/>
      </Dropdown>
    </Dropdown.Menu>
  );
}

export { LabelsDropdownMenu };
