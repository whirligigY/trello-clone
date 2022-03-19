import React from 'react';
import styles from './RenderCardTitle.module.css';
import { Form, Button } from 'react-bootstrap';
import { useInput } from '../../hooks/useInput';

const RenderCardTitle = ({
  cardId,
  title,
  handleCardSave,
  handleCardClose,
}) => {
  const input = useInput(title);
  const { value, onChange } = input;
  return (
    <Form>
      <textarea
        className="form-control"
        id="form-control2"
        rows={2}
        placeholder={title}
        /* eslint-disable */
        autoFocus
        value={value}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="input-group d-flex align-items-center">
        <Button
          variant="primary"
          type="submit"
          className={styles.btn_side}
          onClick={(e) => handleCardSave(e, value, cardId)}
        >
          Save
        </Button>
        <p />
        <Button variant="light" className="mt-2" onClick={handleCardClose}>
          <i className="bi bi-x-lg" />
        </Button>
      </div>
    </Form>
  );
};

export { RenderCardTitle };
