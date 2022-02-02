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
  changeCurrentValue,
  currentCard,
}) => {
  const [cards, setCards] = useState([]);

  function AddTask(text) {
    const newTask = getNewTask(cards.length, text, id);
    setCards([...cards, newTask]);
  }

  const useDragDropCards = () => {
    const dragStartCardHandler = (e, card) => {
      e.dataTransfer.setData("text/plain", "card");
      changeCurrentValue(card);
    };
    const dragOverCardHandler = (e) => {
      e.preventDefault();
    };

    const dragEndCardHandler = (e) => {};
    const dropCardHandler = (e, card, columnID) => {
      e.preventDefault();
      const currentDeleteIndex = cards.findIndex(
        (card) => card.id === currentCard.id
      );
      const currentInsertIndex = cards.findIndex(
        (cardElem) => cardElem.id === card.id
      );
      console.log(currentDeleteIndex, currentInsertIndex);

      setCards([...cards.splice(currentDeleteIndex, 1)]);
      //currentArr.splice(currentInsertIndex, 0, {
      // ...currentCard,
      //  columnId: columnID,
      //});
      // setCards(currentArr);

      console.log(cards);
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
  } = useDragDropCards();

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
