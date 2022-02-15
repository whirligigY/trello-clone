import { useRef, useState, useEffect } from 'react';

const useClick = (initialStatus) => {
  const node = useRef();
  const [open, setOpen] = useState(initialStatus || false);
  const toggle = (status) => {
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
