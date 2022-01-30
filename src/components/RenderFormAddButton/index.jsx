import React from 'react';
import styles from './RenderFormAddButton.module.css';
import { Form, Button } from 'react-bootstrap';

const RenderFormAddButton = ({
  placeholder,
  input,
  textBtn,
  onChangeState,
  handleAddActivity,
}) => {
  const { value, onClear } = input;
  const handleActivity = (value) => {
    onClear();
    handleAddActivity(value);
  };
  return (
    <Form>
      <textarea
        className={'form-control ' + styles.textarea}
        id="form-control"
        rows="3"
        placeholder={placeholder}
        autoFocus
        {...input}
      />
      <div className="input-group d-flex align-items-center">
        <Button
          variant="primary"
          type="submit"
          className={'mt-2 ' + styles.btn_side}
          onClick={() => {
            handleActivity(value);
          }}
        >
          Add {textBtn}
        </Button>
        <p></p>
        <Button
          variant={'light' + styles.btn_transparent}
          className="mt-2"
          onClick={() => onChangeState(false)}
        >
          <i className={'bi bi-x-lg ' + styles.cross} />
        </Button>
      </div>
    </Form>
  );
};

export { RenderFormAddButton };
