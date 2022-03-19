import React, { useState, FC } from 'react';
import { Dropdown } from "react-bootstrap";
import { AddLabelMenu } from './AddLabelMenu'
import "../../TaskModalWindow.css";
import { useEffect } from 'react';
import { LabelsDropdownProps } from './types'
import { Label } from '../../types'

const LabelsDropdownMenu: FC<LabelsDropdownProps> = ({ 
  activeLabels,
  changeActiveLabels,
  labels,
  changeLabels,
  remove
}) => {

  const [trueCardLabels, setTrueCardLabels] = useState<Array<Label>>([]);
  const [search, setSearch] = useState<string>();

  const setCurrentLabels = () => {
    const newLabels = labels.map((item)=>{
      const isActive = activeLabels.find((el: Label)=> Number(el.id) === Number(item.id));
      if (isActive) {
        item.status = true;
      } else {
        item.status = false;
      }
      return item;
    });
    setTrueCardLabels(newLabels);
  }
  
  useEffect(()=>{
    setCurrentLabels();
  }, [])

  let preparedLables = search ? labels.filter((el) => {
    const searchReg = new RegExp(`${search}`, 'i');
    return String(el.value).match(searchReg)
  }) : labels;

  useEffect(() => {
    preparedLables = search ? labels.filter((el) => {
      const searchReg = new RegExp(`${search}`, 'i');
      return String(el.value).match(searchReg)
    }) : labels;
  }, [search])

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const addLabel = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    let active = true;
    if (target.classList.contains("label")) {
      const id = Number((target.closest(".label-item") as HTMLElement).id);
      if (target.classList.contains("active")) {
        active = false;
        activeLabels.forEach((item) => {
          if (Number(item.id) === Number(id)) {
            const index = activeLabels.indexOf(item);
            remove(index);
          }
        });
      }
      const color = String(target.dataset.color);
      const { value } = target;
      const newItem: Label = { id, value, status: active, color };
      changeLabels(newItem);
      if (!target.classList.contains("active")) {
        changeActiveLabels(newItem);
      }
    }
  };

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Search label" onInput={changeSearchValue}/>
      <Dropdown.Divider />
      <div className="labels-list" onClick={addLabel}>
      {preparedLables !== labels && preparedLables.map((item, i) => {
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
      {preparedLables === labels && trueCardLabels.map((item, i) => {
        return <div className="label-item dropdown-item" id={`${item.id}`} key={i}>
          <input className={`label ${item.status ? "active" : ""} ${item.color}`} disabled value={`${item.value}`} data-color={`${item.color}`}/>
          <Dropdown>
            <Dropdown.Toggle
              className="edit-button"
              >
            </Dropdown.Toggle>
            <AddLabelMenu
              id={Number(item.id)}
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
          id={0}
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
