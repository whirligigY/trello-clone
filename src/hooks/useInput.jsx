import { useState } from 'react';

export const useInput = (initial) => {
  const [value, setValue] = useState(initial);

  const onChange = (ev) => {
    setValue(ev.target.value);
  };
  const onClear = () => {
    setValue('');
  };
  return { value, onChange, onClear };
};
