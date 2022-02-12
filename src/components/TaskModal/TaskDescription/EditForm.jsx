import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/Auth';
import '../TaskModalWindow.css';

const EditForm = ({ setHeigth, cardId }) => {
  const [isTextAreaActive, setIsTextAreaActive] = useState(false);
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);
  const [description, setDescription] = useState('');
  const [tempDescription, setTempDescription] = useState(description);

  const { user, client } = useAuth();
  useEffect(() => {
      client
        .from('tsk_cards')
        .select('crd_description')
        .eq('crd_id', cardId)
        .then(({ data, error }) => {
          if (!error) {
            console.log(`data = `, data[0].crd_description);
            setDescription(data[0].crd_description);
          }
          else {
            console.log('error = ', error);
          }
        })
  }, [client])

  useEffect(() => {
    setTempDescription(description);
  }, [description])

  const onSave = () => {
    if (!tempDescription) {
      setIsTextareaVisible(true);
    } else {
      setIsTextareaVisible(false);
    }

    setTaskDescription(tempDescription);
    setIsTextAreaActive(false);
  };

  const onEdit = () => {
    setIsTextareaVisible(true);
    setIsTextAreaActive(true);
  };

  const onClose = () => {
    if (description) {
      setIsTextareaVisible(false);
      setTempDescription(description);
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
      {!isTextAreaActive && description && (
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
