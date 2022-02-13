import { useState, useRef, useEffect } from 'react';

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

export const useDragDrop = (
  swapColumnIndex,
  cards,
  dropComponent,
  changeDropComponent,
  getNewCardState
) => {
  const [order, setOrder] = useState(null);
  const dragStartBoardHandler = (e, order) => {
    setOrder(order);
    changeDropComponent('column');
  };
  const dragOverBoardHandler = (e, newOrder) => {
    e.preventDefault();
  };

  const dragEndBoardHandler = (e, newOrder) => {
    console.log(e.target);
  };
  const dropBoardHandler = (e, newOrder, columnId) => {
    e.preventDefault();

    const dataType = dropComponent;
    if (dataType === 'column') {
      swapColumnIndex(order, newOrder);
    } else {
      if (cards.find((el) => el.columnId === columnId) === undefined)
        getNewCardState(columnId);
    }
  };
  return {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler
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
  if (a.col_order > b.col_order) return 1;
  else return -1;
};

export const sortCards = (a, b) => {
  if (a.crd_order > b.crd_order) return 1;
  else return -1;
};

export const getCardsAfterDragAndDrop = (result, cards) => {
  const { destination, source, draggableId } = result;
  // outside of a column
  if (!destination) return;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  const nextColumn = Number(destination.droppableId);
  const prevColumn = Number(source.droppableId);
  //within the same column
  if (nextColumn === prevColumn) {
    const cardsUp = cards.filter((el) => el.crd_columnid === prevColumn);
    return cardsUp.map((el) => {
      if (el.crd_order === prevOrder) {
        return { ...el, crd_order: nextOrder };
      }
      if (
        nextOrder > prevOrder &&
        el.crd_order > prevOrder &&
        el.crd_order <= nextOrder
      ) {
        return { ...el, crd_order: el.crd_order - 1 };
      }
      if (
        prevOrder > nextOrder &&
        el.crd_order < prevOrder &&
        el.crd_order >= nextOrder
      ) {
        return { ...el, crd_order: el.crd_order + 1 };
      }
      return el;
    });
  } else {
    //Different сolumns
    return cards.map((el) => {
      if (el.crd_columnid === prevColumn && el.crd_order === prevOrder) {
        return { ...el, crd_order: nextOrder, crd_columnid: nextColumn };
      }
      if (el.crd_columnid === prevColumn && el.crd_order > prevOrder) {
        return { ...el, crd_order: el.crd_order - 1 };
      }
      if (el.crd_columnid === nextColumn && el.crd_order >= nextOrder) {
        return { ...el, crd_order: el.crd_order + 1 };
      }
      return el;
    });
  }
};
