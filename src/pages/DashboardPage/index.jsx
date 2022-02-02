import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import { BoardListCard } from "../../components/BoardListCard";
import { AddButton } from "../../components/AddButton";
import { getNewList, useDragDrop, sortColumns } from "../../utils";
import { BoardNavigation } from "../../components/BoardNavigation";

// TODO: Объект задачи отдельная сущность, массив с досками отдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок
// TODO: Колонка это отдельный компонент который должен сделать фетч всех задач и отрендерить в себе только те которые привязаны к ней
const DashboardPage = () => {
  const addColumn = (text) => {
    const newList = getNewList(columns.length, text);
    setColumns([...columns, newList]);
  };
  const swapColumnIndex = (dragOrder, dropOrder) => {
    const getColumn = (col, pos) => {
      return { ...col, order: pos };
    };
    setColumns(
      columns.map((column) => {
        if (column.order === dragOrder) return getColumn(column, dropOrder);
        if (column.order === dropOrder) return getColumn(column, dragOrder);
        return column;
      })
    );
  };

  const {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler,
  } = useDragDrop(swapColumnIndex);
  const [columns, setColumns] = useState([]);

  const [currentCard, setCurrentCard] = useState(null);
  const changeCurrentValue = (card) => {
    setCurrentCard(card);
  };

  const fetchColumns = async () => {
    try {
      const response = await fetch("mocks/boardList.json");
      const data = await response.json();
      // TODO: add load by board id
      setColumns(data[0].columns);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return (
    <div className={"mt-2 " + styles.dashboard_container}>
      <BoardNavigation title="First board" />

      <div className={styles.list_container}>
        {columns.sort(sortColumns).map((column) => (
          <BoardListCard
            {...column}
            key={column.id}
            dataSet="column"
            dropBoardHandler={dropBoardHandler}
            dragStartBoardHandler={dragStartBoardHandler}
            dropBoardHandler={dropBoardHandler}
            dragOverBoardHandler={dragOverBoardHandler}
            dragEndBoardHandler={dragEndBoardHandler}
            changeCurrentValue={changeCurrentValue}
            currentCard={currentCard}
          />
        ))}
        <AddButton
          text={"another column"}
          type={"list"}
          placeholder={"Enter column title"}
          onClick={addColumn}
          textBtn={"column"}
        />
      </div>
    </div>
  );
};

export { DashboardPage };
