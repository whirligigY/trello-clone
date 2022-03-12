import React, { useState } from 'react';
import { Dropdown, Button } from "react-bootstrap";
import { AddLabelMenu } from './AddLabelMenu'
import { EditLabel } from './EditLabel'
import "../../TaskModalWindow.css";
import { useEffect } from 'react';

const LabelsDropdownMenu = ({ activeLabels, changeActiveLabels, labels, changeLabels, remove }) => {
  const [trueCardLabels, setTrueCardLabels] = useState([]);

  const setCurrentLabels = () => {
    const tempArr = [];
    labels.map((item)=>{
      const index = activeLabels.indexOf(activeLabels.find((el)=>el.id == item.id));
      if (index != -1) {
        item.status = true;
      } else {
        item.status = false;
      }
      tempArr.push(item)
      });
      setTrueCardLabels(tempArr)
  }
  useEffect(()=>{
    setCurrentLabels();
  }, [])

  useEffect(()=>{
    setCurrentLabels();
  }, [labels])

  const [search, setSearch] = useState();
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

  const changeSearchValue = (e) => {
    setSearch(e.target.value);
  }

  const [upload, setUpload] = useState(-1);

  const addLabel = (e) => {
    console.log('hi')
    const { target } = e;
    let active = true;
    if (target.classList.contains("label")) {
      const { id }= target.closest(".label-item");
      if (target.classList.contains("active")) {
        active = false;
        activeLabels.forEach((item) => {
          if (Number(item.id) === Number(id)) {
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

  const test = (e) => {
    //console.log('upload = ', upload);
    console.log('clickTarget= ', e.target);
    if (e.target.classList.contains("edit-button")) {
      const { id }= e.target.closest(".label-item");
      setUpload(Number(id))
    } else if (e.target.classList.contains("add-button")) {
      setUpload(0)
    } else  if (e.target.classList.contains("btn-check") || e.target.classList.contains("rectangle")) {
      e.stopPropagation();
    }
  }

  return (
    <Dropdown.Menu>
      <input className="search-input" type="text" placeholder="Search label" onInput={changeSearchValue}/>
      <Dropdown.Divider />
      <div className="labels-list">
      {preparedLables !== labels && preparedLables.map((item, i) => {
        return <div className="label-item" id={`${item.id}`} key={i} onClick={addLabel}>
          <input className={`label ${item.status ? "active" : ""} ${item.color}`} disabled value={`${item.value}`} data-color={`${item.color}`}/>
          <Dropdown onClick={test}>
            <Dropdown.Toggle
              className="edit-button"
              >
            </Dropdown.Toggle>
            <EditLabel
              id={Number(item.id)}
              activeLabels={activeLabels}
              changeActiveLabels={changeActiveLabels}
              cardLabels={trueCardLabels}
              changeLabels={changeLabels}
              remove={remove}
              upload={upload}
              setUpload={setUpload}/>
          </Dropdown>
        </div>;
      })}
      {preparedLables === labels && trueCardLabels.map((item, i) => {
        return <div className="label-item" id={`${item.id}`} key={i} >
          <Button onClick={addLabel}>
            <input className={`label ${item.status ? "active" : ""} ${item.color}`} disabled value={`${item.value}`} data-color={`${item.color}`} /></Button>
          <Dropdown onClick={test}>
            <Dropdown.Toggle
              className="edit-button"
              >
            </Dropdown.Toggle>
            <EditLabel
              id={Number(item.id)}
              activeLabels={activeLabels}
              changeActiveLabels={changeActiveLabels}
              cardLabels={trueCardLabels}
              changeLabels={changeLabels}
              remove={remove}
              upload={upload}
              setUpload={setUpload}
              />
          </Dropdown>
        </div>;
      })}
      </div>
      <Dropdown.Divider />
      <Dropdown onClick={test} autoClose="outside">
        <Dropdown.Toggle
          className="add-button"
          variant="primary"
          id="add-new-label"
          >
          Add new label
        </Dropdown.Toggle>
        <AddLabelMenu
          labels={labels}
          changeLabels={changeLabels}
          upload={upload}
          setUpload={setUpload}/>
      </Dropdown>
    </Dropdown.Menu>
  );
}

export { LabelsDropdownMenu };
