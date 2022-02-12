import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/Auth';
import '../TaskModalWindow.css';

const EditForm = ({ setHeigth, taskDescription, setTaskDescription, cardId }) => {
  
  const [isTextAreaActive, setIsTextAreaActive] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);
  const [tempDescription, setTempDescription] = useState(taskDescription);
  const { user, client } = useAuth();

  useEffect(() => {
    if (taskDescription) {
      setIsTextareaVisible(false)
    }
    setTempDescription(taskDescription);
  }, [taskDescription])

  const onSave = () => {
    if (!tempDescription) {
      setIsTextareaVisible(true);
    } else {
      setIsTextareaVisible(false);
    }
    setTaskDescription(tempDescription);
    setIsTextAreaActive(false);
    saveCompleted(tempDescription);
  }
  const saveCompleted = async (savedDescription) => {
    const { data, error } = await client
      .from('tsk_cards')
      .update({ crd_description: savedDescription })
      .eq('crd_id', cardId)
};

  const onEdit = () => {
    setIsTextareaVisible(true);
    setIsTextAreaActive(true);
  };

  const onClose = () => {
    if (taskDescription) {
      setIsTextareaVisible(false);
      setTempDescription(taskDescription);
    }
    setIsTextAreaActive(false);
  };

  const onChange = (e) => {
    setTempDescription(e.target.value);
  };

  return (
    <div>
      {isTextareaVisible && (
        <Form.Control
          as="textarea"
          className={`description-text ${isTextAreaActive ? '' : 'hover'}`}
          rows={isTextAreaActive ? 3 : 2}
          placeholder="Add task description"
          onFocus={() => setIsTextAreaActive(true)}
          onKeyUp={setHeigth}
          onChange={onChange}
          value={tempDescription}
        />
      )}
      {isTextAreaActive && (
        <div className="discription-control">
          <Button className="save-task-description" onClick={onSave}>
            Save
          </Button>
          <Button className="btn-close" aria-label="Close" onClick={onClose} />
        </div>
      )}
      {!isTextareaVisible && (
        <div className="task-saved-description">
          <p>{taskDescription}</p>
        </div>
      )}
      {!isTextAreaActive && taskDescription && (
        <Button
          className="edit-task-description"
          variant="outline-secondary"
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export { EditForm };
