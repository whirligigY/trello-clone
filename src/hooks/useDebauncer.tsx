import { useState, useEffect } from 'react';

export const useDebauncer = (
  value: string,
  timeout: number,
  callback: () => void
) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
};
