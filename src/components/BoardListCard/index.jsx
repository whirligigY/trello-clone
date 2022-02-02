import React, { useState, useEffect } from "react";
import styles from "./BoardListCard.module.css";
import { BoardCard } from "../BoardCard";
import { AddButton } from "../AddButton";
import { getNewTask } from "../../utils";
import { BoardTitleTextarea } from "../BoardTitleTextarea";

const BoardListCard = ({
  title,
  id,
  order,
  dataSet,
  dropBoardHandler,
  dragStartBoardHandler,
  dragOverBoardHandler,
  dragEndBoardHandler,
}) => {
  const [cards, setCards] = useState([]);
  function AddTask(text) {
    const newTask = getNewTask(cards.length, text, id);
    setCards([...cards, newTask]);
  }

  const swapCardIndex = (dragOrder, dropOrder) => {
    /*const getColumn = (col, pos) => {
      return { ...col, order: pos };
    };
    setColumns(
      columns.map((column) => {
        if (column.order === dragOrder) return getColumn(column, dropOrder);
        if (column.order === dropOrder) return getColumn(column, dragOrder);
        return column;
      })
    );*/
  };
  const useDragDropCards = (swapCardIndex) => {
    const [currentCard, setCurrentCard] = useState(null);
    const [currentBoard, setCurrentBoard] = useState(null);
    const dragStartCardHandler = (e, columnId) => {
      e.dataTransfer.setData("text/plain", "card");
      //console.log(e, id, columnId);
      //if (!e.target.classList.contains("card")) setOrder(order);
    };
    const dragOverCardHandler = (e) => {
      e.preventDefault();
    };

    const dragEndCardHandler = (e) => {};
    const dropCardHandler = (e, columnId) => {
      e.preventDefault();
      // e.stopImmediatePropagation();
      //console.log(e, id, columnId);
      //swapCardIndex(order, newOrder);
    };
    return {
      dragStartCardHandler,
      dragOverCardHandler,
      dragEndCardHandler,
      dropCardHandler,
    };
  };
  const {
    dragStartCardHandler,
    dragOverCardHandler,
    dragEndCardHandler,
    dropCardHandler,
  } = useDragDropCards(swapCardIndex);

  const getCards = async () => {
    const response = await fetch("mocks/tasks.json");
    const data = await response.json();
    setCards(data);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div
      className={styles.container}
      data-set="column"
      draggable={true}
      onDragStart={(e) => dragStartBoardHandler(e, dataSet, order)}
      onDragLeave={dragEndBoardHandler}
      onDragEnd={dragEndBoardHandler}
      onDragOver={dragOverBoardHandler}
      onDrop={(e) => dropBoardHandler(e, dataSet, order)}
      capture={true}
    >
      <h4>{title}</h4>
      {/* <BoardTitleTextarea title={title} /> */}

      {cards.map((card) => (
        <BoardCard
          columnId={id}
          card={card}
          key={card.id}
          dragStartCardHandler={dragStartCardHandler}
          dragOverCardHandler={dragOverCardHandler}
          dragEndCardHandler={dragEndCardHandler}
          dropCardHandler={dropCardHandler}
        />
      ))}
      <AddButton
        text={"task"}
        type={"card"}
        listId={id}
        placeholder={"Enter a title for this card"}
        textBtn={"task"}
        onClick={AddTask}
      />
    </div>
  );
};

export { BoardListCard };
