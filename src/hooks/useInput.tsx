import { useState } from 'react';

export const useInput = (initial: string) => {
  const [value, setValue] = useState(initial);

  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement> | undefined) => {
    setValue((ev.target as HTMLTextAreaElement).value);
  };
  const onClear = () => {
    setValue('');
  };

  const obj = { value, onChange, onClear };
  return obj;
};
