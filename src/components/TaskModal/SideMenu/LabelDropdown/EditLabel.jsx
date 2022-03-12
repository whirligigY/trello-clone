import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import '../../TaskModalWindow.css';

const EditLabel = ({ changeLabels, label }) => {
  const [title, setTitle] = useState(label.value ?? '');
  const [newColorCandidat, setNewColorCandidat] = useState('');

  const addColor = useCallback((e) => {
    setNewColorCandidat(e.target.value);
  }, []);

  const editTitle = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = () => {
      changeLabels({ ...label, color: newColorCandidat, value: title ?? label.value })
  };

  return (
    <Dropdown.Menu className="edit">
      <input
        className="label-name-input"
        type="text"
        placeholder="Label name"
        value={title}
        onChange={editTitle}
      />
      <Dropdown.Divider />
      <ToggleButtonGroup
        className="labels-colors"
        type="radio"
        name="options"
        value={newColorCandidat}
        onClick={addColor}
      >
        <ToggleButton
          className="rectangle blue"
          id="tbg-radio-11"
          value={'blue'}
        />
        <ToggleButton
          className="rectangle yellow"
          id="tbg-radio-12"
          value={'yellow'}
        />
        <ToggleButton
          className="rectangle red"
          id="tbg-radio-13"
          value={'red'}
        />
        <ToggleButton
          className="rectangle green"
          id="tbg-radio-14"
          value={'green'}
        />
        <ToggleButton
          className="rectangle darkorchid"
          id="tbg-radio-15"
          value={'darkorchid'}
        />
        <ToggleButton
          className="rectangle orange"
          id="tbg-radio-16"
          value={'orange'}
        />
        <ToggleButton
          className="rectangle deepskyblue"
          id="tbg-radio-17"
          value={'deepskyblue'}
        />
        <ToggleButton
          className="rectangle sandybrown"
          id="tbg-radio-18"
          value={'sandybrown'}
        />
        <ToggleButton
          className="rectangle plum"
          id="tbg-radio-19"
          value={'plum'}
        />
        <ToggleButton
          className="rectangle khaki"
          id="tbg-radio-20"
          value={'khaki'}
        />
      </ToggleButtonGroup>

      <Dropdown.Divider />
      <Dropdown.Item
        as="button"
        className="save-label"
        id="save-label"
        onClick={onSubmit}
      >
        Save
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export { EditLabel };
