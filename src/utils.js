import { useState, useRef, useEffect } from 'react';

export const getNewList = (length, text) => {
  return {
    id: length,
    title: text,
    order: length + 1,
    cards: [],
  };
};

export const getNewTask = (length, text, id) => {
  return {
    id: length,
    title: text,
    status: 'active',
    columnId: id,
    order: length + 1,
  };
};

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

export const useDragDrop = (swapColumnIndex) => {
  const [order, setOrder] = useState(null);
  const dragStartBoardHandler = (e, order) => {
    setOrder(order);
  };
  const dragOverBoardHandler = (e) => {
    e.preventDefault();
  };

  const dragEndBoardHandler = (e) => {
    e.target.style.opacity = '1';
  };
  const dropBoardHandler = (e, newOrder) => {
    e.preventDefault();
    e.target.style.opacity = '1';
    swapColumnIndex(order, newOrder);
  };
  return {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler,
  };
};

export const useClick = (initialStatus) => {
  const node = useRef();
  const [open, setOpen] = useState(initialStatus || false);
  const toggle = (status) => {
    if (typeof status === 'undefined') {
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

export const sortColumns = (a, b) => {
  if (a.order > b.order) return 1;
  else return -1;
};
