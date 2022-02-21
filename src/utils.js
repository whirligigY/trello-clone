import { useState, useEffect } from 'react';

export const getNewColumn = (id, text, columns) => {
  return {
    col_boardid: id,
    col_title: text,
    col_order: columns.length + 1,
  };
};

export const getNewCard = (idColumn, text, numElemInColumn) => {
  return {
    crd_columnid: idColumn,
    crd_title: text,
    crd_order: numElemInColumn.length + 1,
  };
};

export const sortCards = (a, b) => {
  if (a.crd_order > b.crd_order) return 1;
  return -1;
};

export const sortColumns = (a, b) => {
  if (a.col_order > b.col_order) return 1;
  return -1;
};

const getNewOrderArray = (arr, field, prevOrder, nextOrder) =>
  arr.map((el) => {
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

export function getCardsAfterDragAndDrop(result, cards) {
  const { destination, source } = result;
  // outside of a column
  if (!destination) return;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  const nextColumn = Number(destination.droppableId);
  const prevColumn = Number(source.droppableId);
  // within the same column
  if (nextColumn === prevColumn) {
    const cardsUp = cards.filter((el) => el.crd_columnid === prevColumn);
    const res = getNewOrderArray(cardsUp, 'crd_order', prevOrder, nextOrder);
    /* eslint-disable */
    return res;
  }
  // Different сolumns
  /* eslint-disable */
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

export const getColumnsAfterDragAndDrop = (result, columns) => {
  const { destination, source } = result;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  if (nextOrder !== prevOrder) {
    return getNewOrderArray(columns, 'col_order', prevOrder, nextOrder);
  }
  return [];
};

export const useDebauncer = (value, timeout, callback) => {
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
