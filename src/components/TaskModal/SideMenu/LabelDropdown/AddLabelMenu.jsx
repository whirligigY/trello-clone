import React, { useState, useEffect } from 'react';
import { Dropdown, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../../TaskModalWindow.css";

const AddLabelMenu = ({ 
  labels,
  changeLabels,
  upload,
  setUpload
 }) => {
  const [newLabel, setNewLabel] = useState({});
  const [labelTitle, setLabelTitle] = useState('');
  const [value, setValue] = useState('blue');

  const addNewColor = (e) => {
    if (newLabel.color !== e.target.value) {
      console.log('add color for new Label = ', e.target.value);
      setValue(String(e.target.value));
      setNewLabel((prevState) => {return {...prevState, color: e.target.value}});
    }
  }

  useEffect(()=>{console.log('new Color for new Label= ', value)}, [value])

  useEffect (()=>{
    if (upload == 0) {
      setNewLabel({id: labels.length + 1, color: 'blue', value: '', status: false});
    }
    setUpload(labels.length + 1);
  }, [upload]
  )

  const addTitle = (e) => {
    setNewLabel((prevState) => {return {...prevState, value: e.target.value}});
    setLabelTitle(e.target.value);
  }

  const addNewLabel = () => {
    console.log('addNewLabel = ', newLabel)
    changeLabels(newLabel);
    //setNewLabel({id: 0, color: 'blue', value: '', status: false})
    setLabelTitle('');
    setValue('blue');
  };

  return (
    <Dropdown.Menu className='add'>
      <input className="label-name-input" type="text" placeholder="Label name" value={labelTitle} onChange={addTitle}/>
      <Dropdown.Divider />

      <ToggleButtonGroup className='new-labels-colors' type="radio" name="options" value={value} onClick={addNewColor}>
        <ToggleButton className='rectangle blue' id="tbg-radio-1" value={'blue'}/>
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