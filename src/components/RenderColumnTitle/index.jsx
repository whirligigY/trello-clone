import React from 'react';
import { useInput } from '../../hooks/useInput';
import styles from './RenderColumnTitle.module.css';

const RenderColumnTitle = ({ title, handleBlur, id }) => {
  const input = useInput(title);
  const { value, onChange } = input;

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <form>
      <input
        className={styles.input_titleColumn}
        value={value}
        onChange={onChange}
        type="text"
        /* eslint-disable */
        autoFocus
        onFocus={handleFocus}
        onBlur={() => handleBlur(value, id)}
      />
    </form>
  );
};

export { RenderColumnTitle };
