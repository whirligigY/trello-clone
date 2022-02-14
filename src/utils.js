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

export const sortCards = (a, b) => {
  if (a.crd_order > b.crd_order) return 1;
  else return -1;
};

export const sortColumns = (a, b) => {
  if (a.col_order > b.col_order) return 1;
  else return -1;
};

const getNewOrderArray = (arr, field, prevOrder, nextOrder) => {
  return arr.map((el) => {
    if (el[field] === prevOrder) {
      return { ...el, [field]: nextOrder };
    }
    if (
      nextOrder > prevOrder &&
      el[field] > prevOrder &&
      el[field] <= nextOrder
    ) {
      return { ...el, [field]: el[field] - 1 };
    }
    if (
      prevOrder > nextOrder &&
      el[field] < prevOrder &&
      el[field] >= nextOrder
    ) {
      return { ...el, [field]: el[field] + 1 };
    }
    return el;
  });
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
    return getNewOrderArray(cardsUp, 'crd_order', prevOrder, nextOrder);
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

export const getColumnsAfterDragAndDrop = (result, columns) => {
  const { destination, source } = result;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  if (nextOrder !== prevOrder) {
    return getNewOrderArray(columns, 'col_order', prevOrder, nextOrder);
  }
};
