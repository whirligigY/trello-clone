import React, { useState, useEffect } from 'react';
import { Dropdown, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../../TaskModalWindow.css";

const EditLabel = ({ 
  changeActiveLabels,
  cardLabels,
  changeLabels,
  id,
  upload,
  setUpload
 }) => {
  const [editLabel, setEditLabel] = useState({});
  const [editLabelTitle, setEditLabelTitle] = useState('');
  const [val, setVal] = useState('');

  const addColor = (e) => {
      if (editLabel.color !== e.target.value) {
        console.log('current color of edit label = ', editLabel.color )
        console.log('new color of edit label = ', e.target.value )
        setVal(String(e.target.value));
        setEditLabel({...editLabel, color: e.target.value});
      }
  }

    console.log('settedValue = ', val)
    console.log('editedLabel = ', editLabel)

  useEffect (()=>{
    if (upload == id)  {
      console.log('id = ', upload)
      const item = cardLabels.filter((item) => Number(item.id) === Number(id));
      console.log('item = ', item[0])
      setEditLabel({ id: Number(id), color: `${item[0].color ? item[0].color : 'blue'}`, value: `${item[0].value ? item[0].value : ''}`, status: item[0].status});
      setEditLabelTitle(item[0].value);
      setVal(item[0].color || 'blue');
    }
    setUpload(-1);
  }, [upload]
  )

  const editTitle = (e) => {
    setEditLabel((prevState) => {return {...prevState, value: e.target.value}});
    setEditLabelTitle(e.target.value);
  }

  const addEditLabel = () => {
    console.log('editedLabel = ', editLabel)
    console.log('newVal = ', val)
    changeLabels(editLabel);
    console.log()
    //setEditLabel({id: 0, color: 'blue', value: '', status: false})
  };

  return (
    <Dropdown.Menu className="edit">
      <input className="label-name-input" type="text" placeholder="Label name" value={editLabelTitle} onChange={editTitle}/>
      <Dropdown.Divider />
      <ToggleButtonGroup className='labels-colors' type="radio" name="options" value={val} onClick={addColor}>
        <ToggleButton className='rectangle blue' id="tbg-radio-11" value={'blue'} />
        <ToggleButton className='rectangle yellow' id="tbg-radio-12" value={'yellow'} />
        <ToggleButton className='rectangle red' id="tbg-radio-13" value={'red'} />
        <ToggleButton className='rectangle green' id="tbg-radio-14" value={'green'} />
        <ToggleButton className='rectangle darkorchid' id="tbg-radio-15" value={'darkorchid'} />
        <ToggleButton className='rectangle orange' id="tbg-radio-16" value={'orange'} />
        <ToggleButton className='rectangle deepskyblue' id="tbg-radio-17" value={'deepskyblue'} />
        <ToggleButton className='rectangle sandybrown' id="tbg-radio-18" value={'sandybrown'} />
        <ToggleButton className='rectangle plum' id="tbg-radio-19" value={'plum'} />
        <ToggleButton className='rectangle khaki' id="tbg-radio-20" value={'khaki'} />
      </ToggleButtonGroup>
      
      <Dropdown.Divider />
      <Dropdown.Item as="button" className='save-label' id='save-label' onClick={addEditLabel}>
        Save
      </Dropdown.Item>
    </Dropdown.Menu>
  );
}

export { EditLabel };