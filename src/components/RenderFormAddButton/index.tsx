import React, { FC } from 'react';
import styles from './RenderFormAddButton.module.css';
import { Form, Button } from 'react-bootstrap';
import { RenderFormAddButtonProps } from './index.props';
import { RenderProps } from '../RenderFormAddButton/index.props';

const RenderFormAddButton: FC<RenderFormAddButtonProps> = ({
  placeholder,
  input,
  textBtn,
  onChangeState,
  handleAddActivity,
}) => {
  const handleActivity = (value) => {
    input.onClear();
    handleAddActivity(value);
  };
  return (
    <Form>
      <textarea
        className={'form-control ' + styles.textarea}
        id="form-control"
        rows={3}
        placeholder={placeholder}
        autoFocus
        value={input.value}
        onChange={input.onChange}
      />
      <div className="input-group d-flex align-items-center">
        <Button
          variant="primary"
          type="button"
          className={'mt-2 ' + styles.btn_side}
          onClick={() => {
            handleActivity(input.value);
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
          <i className={'bi bi-x-lg ' + styles.cross} onClick={input.onClear} />
        </Button>
      </div>
    </Form>
  );
};

export { RenderFormAddButton };
