import { useState, useEffect } from 'react';
import {
  ColumnType,
  CardType,
  ArrProps,
} from './pages/DashboardPage/index.props';
import { DropResult } from 'react-beautiful-dnd';

export const getNewColumn = (
  id: number,
  text: string,
  columns: ColumnType[]
): ColumnType => {
  return {
    col_boardid: id,
    col_title: text,
    col_order: columns.length + 1,
  };
};

export const getNewCard = (
  idColumn: number,
  text: string,
  numElemInColumn: CardType[]
): CardType => {
  return {
    crd_columnid: idColumn,
    crd_title: text,
    crd_order: numElemInColumn.length + 1,
  };
};

export const sortCards = (a: CardType, b: CardType): number => {
  if (a.crd_order > b.crd_order) return 1;
  return -1;
};

export const sortColumns = (a: ColumnType, b: ColumnType): number => {
  const orderA = a.col_order as number;
  const orderB = b.col_order as number;
  if (orderA > orderB) return 1;
  return -1;
};

const getNewOrderArray = (
  arr: ArrProps[],
  field: 'crd_order' | 'col_order',
  prevOrder: number,
  nextOrder: number
): ColumnType[] | CardType[] =>
  arr.map((el) => {
    const val = el[field] as number;
    if (val === prevOrder) {
      return { ...el, [field]: nextOrder };
    }
    if (nextOrder > prevOrder && val > prevOrder && val <= nextOrder) {
      return { ...el, [field]: val - 1 };
    }
    if (prevOrder > nextOrder && val < prevOrder && val >= nextOrder) {
      return { ...el, [field]: val + 1 };
    }
    return el;
  });

export function getCardsAfterDragAndDrop(
  result: DropResult,
  cards: CardType[]
): CardType[] {
  const { destination, source } = result;
  // outside of a column
  if (!destination) return cards;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  const nextColumn = Number(destination.droppableId);
  const prevColumn = Number(source.droppableId);
  // within the same column
  if (nextColumn === prevColumn) {
    const cardsUp = cards.filter(
      (el: CardType) => el.crd_columnid === prevColumn
    );
    const res = getNewOrderArray(
      cardsUp,
      'crd_order',
      prevOrder,
      nextOrder
    ) as CardType[];
    /* eslint-disable */
    return res;
  }
  // Different сolumns
  /* eslint-disable */
  return cards.map((el) => {
    const order = el.crd_order as number;
    if (el.crd_columnid === prevColumn && el.crd_order === prevOrder) {
      return { ...el, crd_order: nextOrder, crd_columnid: nextColumn };
    }
    if (el.crd_columnid === prevColumn && order > prevOrder) {
      return { ...el, crd_order: order - 1 };
    }
    if (el.crd_columnid === nextColumn && order >= nextOrder) {
      return { ...el, crd_order: order + 1 };
    }
    return el;
  });
}

export const getColumnsAfterDragAndDrop = (
  result: DropResult,
  columns: ColumnType[]
): ColumnType[] => {
  const { destination, source } = result;
  const nextOrder = destination.index + 1;
  const prevOrder = source.index + 1;
  if (nextOrder !== prevOrder) {
    return getNewOrderArray(
      columns,
      'col_order',
      prevOrder,
      nextOrder
    ) as ColumnType[];
  }
  return columns;
};

export const useDebauncer = (
  value: string,
  timeout: Date,
  callback: () => {}
) => {
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
