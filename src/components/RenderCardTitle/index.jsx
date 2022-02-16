import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { useInput } from '../../hooks/useInput';

const RenderCardTitle = ({ title, handleCardSave, handleCardClose }) => {
  const input = useInput(title);
  const { value, onChange } = input;
  return (
    <Form>
      <textarea
        className="form-control"
        id="form-control2"
        rows="2"
        placeholder={title}
        /* eslint-disable */
        autoFocus
        value={value}
        onChange={onChange}
      />
      <div className="input-group d-flex align-items-center">
        <Button
          variant="primary"
          type="submit"
          className="mt-2"
          onClick={handleCardSave}
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
