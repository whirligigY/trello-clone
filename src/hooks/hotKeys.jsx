import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export const useKeyPress = (keys, comboKeys, callback, node = null) => {
  const [key, setKey] = useState(false);

  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (comboKeys.some((key) => event.key === key)) {
        setKey(true);
      }

      if (keys.some((key) => event.key === key) && key) {
        callbackRef.current(event);
      }
    },
    [keys, comboKeys, key]
  );

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    return () =>
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
};
