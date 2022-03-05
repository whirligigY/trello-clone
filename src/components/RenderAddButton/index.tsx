import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { RenderAddButtonProps } from './index.props';
import styles from './RenderAddButton.module.css';

const RenderAddButton: FC<RenderAddButtonProps> = ({
  type,
  textBtn,
  onChangeState,
}) => {
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
