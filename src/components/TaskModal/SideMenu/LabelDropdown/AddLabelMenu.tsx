import React, { useState, useEffect, FC } from 'react';
import { Dropdown, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../../TaskModalWindow.css";
import { AddLabelMenuProps } from './types'
import { Label } from '../../types'

const AddLabelMenu: FC<AddLabelMenuProps> = ({ 
  changeActiveLabels,
  labels,
  changeLabels,
  id,
  title,
  itemColor,
  itemStatus }) => {
  const [newLabel, setNewLabel] = useState<Label>({id: id, color: itemColor, value: title, status: false});
  const [labelTitle, setLabelTitle] = useState<string>(title || '');
  const [value, setValue] = useState<string>(itemColor || '');

  const addColor = (val) => {
    setValue(val);
    setNewLabel((prevState) => {return {...prevState, color: val}});
  }

  useEffect (()=>{
    if (itemStatus) {
      setNewLabel((prevState) => {return {...prevState, status: true}});
    } else {
      setNewLabel((prevState) => {return {...prevState, status: false}});
    }
  }, [itemStatus]
  )

  const addTitle = (e) => {
    setNewLabel((prevState) => {return {...prevState, value: e.target.value}});
    setLabelTitle(e.target.value);
  }

  const addNewLabel = () => {
    if (id) {
      setNewLabel((prevState) => {return {...prevState, id: Number(id)}});
    } else {
      setNewLabel((prevState) => {return {...prevState, id: Number(labels.length + 1)}});
    }
    changeLabels(newLabel);
    if (itemStatus) {
      changeActiveLabels(newLabel);
    }
  };

  return (
    <Dropdown.Menu>
      <input className="label-name-input" type="text" placeholder="Label name" value={labelTitle} onChange={addTitle}/>
      <Dropdown.Divider />

      <ToggleButtonGroup className='labels-colors' type="radio" name="options" value={value} onChange={addColor}>
        <ToggleButton className='rectangle blue' id="tbg-radio-1" value={'blue'} />
        <ToggleButton className='rectangle yellow' id="tbg-radio-2" value={'yellow'} />
        <ToggleButton className='rectangle red' id="tbg-radio-3" value={'red'} />
        <ToggleButton className='rectangle green' id="tbg-radio-4" value={'green'} />
        <ToggleButton className='rectangle darkorchid' id="tbg-radio-5" value={'darkorchid'} />
        <ToggleButton className='rectangle orange' id="tbg-radio-6" value={'orange'} />
        <ToggleButton className='rectangle deepskyblue' id="tbg-radio-7" value={'deepskyblue'} />
        <ToggleButton className='rectangle sandybrown' id="tbg-radio-8" value={'sandybrown'} />
        <ToggleButton className='rectangle plum' id="tbg-radio-9" value={'plum'} />
        <ToggleButton className='rectangle khaki' id="tbg-radio-10" value={'khaki'} />
      </ToggleButtonGroup>
      
      <Dropdown.Divider />
      <Dropdown.Item as="button" className='save-label' id='save-label' onClick={addNewLabel}>
        Save
      </Dropdown.Item>
    </Dropdown.Menu>
  );
}

export { AddLabelMenu };