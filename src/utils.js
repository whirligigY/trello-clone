
import { useState, useRef, useEffect } from 'react';


export const getNewList = (boardId, text, length) => {
  return {

    col_boardid: boardId,
    col_title: text,
    col_order: length + 1
  };
};


export const getNewTask = (length, text, id) => {
  return {
    id: length,
    title: text,
    status: 'active',
    columnId: id,
    order: length + 1

  };
};


export const useInput = (initial) => {
  const [value, setValue] = useState(initial)

  const onChange = (ev) => {
    setValue(ev.target.value)
  }
  const onClear = () => {

    setValue('');
  };
  return { value, onChange, onClear };
};


export const useDragDrop = (
  swapColumnIndex,
  cards,
  dropComponent,
  changeDropComponent,
  getNewCardState
) => {
  const [order, setOrder] = useState(null)
  const dragStartBoardHandler = (e, order) => {

    setOrder(order);
    changeDropComponent('column');
  };

  const dragOverBoardHandler = (e, newOrder) => {
    e.preventDefault()
  }

  const dragEndBoardHandler = (e, newOrder) => {
    console.log(e.target)
  }
  const dropBoardHandler = (e, newOrder, columnId) => {
    e.preventDefault()


    const dataType = dropComponent;
    if (dataType === 'column') {
      swapColumnIndex(order, newOrder);

    } else {
      if (cards.find((el) => el.columnId === columnId) === undefined)
        getNewCardState(columnId)
    }
  }
  return {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler

  };
};


export const useClick = (initialStatus) => {
  const node = useRef()
  const [open, setOpen] = useState(initialStatus || false)
  const toggle = (status) => {
    if (typeof status === 'undefined') {
      status = !open;

    }
    setOpen(status)
  }
  const closeMenuHandler = (e) => {
    toggle(node.current.contains(e.target))
  }
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

export const debauncer = (value, timeout, callback) => {
  const [timer, setTimer] = useState(null);

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

