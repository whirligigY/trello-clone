import { Button } from 'react-bootstrap';
import styles from './RenderAddButton.module.css';

const RenderAddButton = ({ type, textBtn, onChangeState }) => {
  return (
    <Button
      variant="light"
      className={styles[type]}
      onClick={() => onChangeState(true)}
    >
      <i className={'bi bi-plus-lg'} />
      <span className={'p-2'}>Add {textBtn}</span>
    </Button>
  );
};
export { RenderAddButton };
