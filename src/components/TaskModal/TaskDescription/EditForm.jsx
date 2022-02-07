import React from 'react';
import { Form } from 'react-bootstrap';
import { DiscriptionControl } from './DiscriptionControl';
import '../TaskModalWindow.css'


const EditForm = ({ activeStatus, setActiveState, description, setDescription, setHeigth, saveDescription, stopEdit }) => {

  return (
    <div>
      <Form.Control as="textarea" 
        className={`description-text ${activeStatus ? "" : "hover"}`} 
        rows={activeStatus ? 3 : 2} 
        placeholder="Add task description" 
        onFocus={() => setActiveState(true)}
        onKeyUp={setHeigth}
        onChange={(value) => {
          setDescription(value.target.value);
        }}
        value={ description }
      />
      {activeStatus && (
        <DiscriptionControl save={saveDescription} close={stopEdit}/>
      )}
      {!activeStatus && (
        null
      )}
    </div>
  )
}

export { EditForm };

