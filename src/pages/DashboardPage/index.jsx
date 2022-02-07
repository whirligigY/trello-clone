import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import { BoardListCard } from "../../components/BoardListCard";
import { AddButton } from "../../components/AddButton";
import { getNewList, useDragDrop, sortColumns } from "../../utils";
import { BoardNavigation } from "../../components/BoardNavigation";
import { getNewTask } from "../../utils";
import { BoardAside } from "../../components/BoardAside";

// TODO: Объект задачи отдельная сущность, массив с досками отдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок
// TODO: Колонка это отдельный компонент который должен сделать фетч всех задач и отрендерить в себе только те которые привязаны к ней
const DashboardPage = () => {
  const [columns, setColumns] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [dropComponent, setDropComponent] = useState(null);

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

  const getNewCardState = (columnID, card) => {
    currentCard.columnId = columnID;
    let newCards = cards.filter((el) => el.id !== currentCard.id);
    if (!card) {
      newCards.push(currentCard);
    } else {
      newCards.splice(
        newCards.findIndex((el) => el.id === card.id) + 1,
        0,
        currentCard
      );
    }
    setCards([...newCards]);
  };

  const changeDropComponent = (component) => {
    setDropComponent(component);
  };

  const {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler,
  } = useDragDrop(
    swapColumnIndex,
    cards,
    dropComponent,
    changeDropComponent,
    getNewCardState
  );

  const changeCurrentValue = (card) => {
    setCurrentCard(card);
  };

  function AddTask(text, id) {
    const newTask = getNewTask(cards.length, text, id);
    setCards([...cards, newTask]);
  }

  const getData = async (type, url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (type === "board") setColumns(data[0].columns);
      if (type === "card") setCards(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData("board", "mocks/boardList2.json");
    getData("card", "mocks/tasks2.json");
  }, []);

  return (
    <div className={styles.container}>
      <BoardAside />
      <div className={styles.dashboard_container_right}>
        <BoardNavigation title="First board" />
        <div className={styles.list_container}>
          {columns.sort(sortColumns).map((column) => (
            <BoardListCard
              {...column}
              key={column.id}
              dropBoardHandler={dropBoardHandler}
              dragStartBoardHandler={dragStartBoardHandler}
              dropBoardHandler={dropBoardHandler}
              dragOverBoardHandler={dragOverBoardHandler}
              dragEndBoardHandler={dragEndBoardHandler}
              changeCurrentValue={changeCurrentValue}
              cards={cards}
              currentCard={currentCard}
              AddTask={AddTask}
              getNewCardState={getNewCardState}
              changeDropComponent={changeDropComponent}
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
    </div>
  );
};

export { DashboardPage };
