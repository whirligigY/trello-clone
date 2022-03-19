import React, { useState, useEffect, FC } from 'react';
import { ProgressBar, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../TaskModalWindow.css'
import { CheckListProps, Checkbox, CheckedCheckbox } from './types';

const CheckList: FC<CheckListProps> = ({ 
   title,
   id,
   addCheckBox,
   changeCheckboxTitle,
   changeProgress,
   removeCheckList,
   removeCheckListItem,
   checkboxes,
   checkedCheckboxes
   }) => {
  const [progress, setProgress] = useState<number>();
  const [listCheckboxes, setListCheckboxes] = useState<Array<Checkbox>>([]);
  const [listCheckedCheckboxes, setListCheckedCheckboxes] = useState<Array<CheckedCheckbox>>([]);

  useEffect (
    () => {
      if (listCheckedCheckboxes.length === 0) {
        setProgress(0);
      } else if (listCheckedCheckboxes.length === listCheckboxes.length) {
        setProgress(100);
      } else {
        setProgress(Math.round(listCheckedCheckboxes.length/listCheckboxes.length * 100));
      }
    },
    [listCheckedCheckboxes, listCheckboxes]
  );

  useEffect (
    () => {
      setListCheckboxes(checkboxes.filter((item) => item.listId === id))
    },
    [checkboxes]
  );

  useEffect (
    () => {
        setListCheckedCheckboxes([...checkedCheckboxes.filter((item) => item.listId == id)])
    },
    [checkedCheckboxes]
  );

  return (
    <div className="check-list" data-num={id}>
      <div className='check-list-header'>
        <h3>
          {title}
        </h3>
        <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckList}>Remove</Button>
      </div>
      <ProgressBar striped now={progress} label={`${progress}%`} max={100}/>
        {listCheckboxes.length != 0 && (
          <div className="check-list-items">
            { checkboxes.map((item) => {
              if (item.listId == id) {
                return <InputGroup className="mb-3 subtask" key={item.id} id={String(item.id)}>
                  <InputGroup.Checkbox id={item.id} aria-label="Checkbox for following text input" checked={item.status} 
                  onChange={(e: Event) => changeProgress(e.target as HTMLElement)}
                  data-status={item.status}/>
                  <FormControl aria-label="Text input with checkbox" value={item.title} onChange={changeCheckboxTitle}/>
                  <Button className='remove-check-list' variant="outline-secondary" onClick={removeCheckListItem}>Remove</Button>
                </InputGroup>
              }
              return null;
            }
            )}
          </div>
        )}
        {checkboxes.length == 0 && ( null )}
      <Button className="add-checkbox" variant="secondary" onClick={()=>addCheckBox(id)}>Add element</Button>
    </div>
  )
}

export { CheckList };
