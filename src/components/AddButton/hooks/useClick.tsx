import { useRef, useState, useEffect } from 'react';

const useClick = (initialStatus: boolean) => {
  const node = useRef<HTMLDivElement>();
  const [open, setOpen] = useState(initialStatus || false);
  const toggle = (status: boolean): void => {
    if (typeof status === 'undefined') {
      /* eslint-disable */
      status = !open;
    }
    setOpen(status);
  };
  const closeMenuHandler = (e) => {
    toggle(node.current.contains(e.target));
  };
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', closeMenuHandler);
    } else {
      document.removeEventListener('mousedown', closeMenuHandler);
    }
    return () => {
      document.removeEventListener('mousedown', closeMenuHandler);
    };
  }, [open]);
  return [node, open, toggle];
};

export { useClick };
