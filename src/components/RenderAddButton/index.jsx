import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './RenderAddButton.module.css';

const RenderAddButton = ({ type, textBtn, onChangeState }) => {
  return (
    <Button
      variant="light"
      className={styles[type]}
      onClick={() => onChangeState(true)}
    >
      <i
        className={
          'bi bi-plus-lg ' + (textBtn === 'column' ? styles.color : '')
        }
      />
      <span className={'p-2 ' + (textBtn === 'column' ? styles.color : '')}>
        Add {textBtn}
      </span>
    </Button>
  );
};
export { RenderAddButton };
