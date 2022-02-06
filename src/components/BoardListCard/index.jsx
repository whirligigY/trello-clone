import React, { useState, useEffect } from "react";
import styles from "./BoardListCard.module.css";
import { BoardCard } from "../BoardCard";
import { AddButton } from "../AddButton";
import { BoardTitleTextarea } from "../BoardTitleTextarea";
import { useDragDropCards } from "../../pages/DashboardPage/hooks";

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
  getNewCardState,
  cards,
  AddTask,
  changeDropComponent,
}) => {
  const {
    dragStartCardHandler,
    dragOverCardHandler,
    dragEndCardHandler,
    dropCardHandler,
  } = useDragDropCards(
    changeCurrentValue,
    getNewCardState,
    changeDropComponent
  );

  return (
    <div
      className={styles.container}
      draggable={true}
      onDragStart={(e) => dragStartBoardHandler(e, order)}
      onDragLeave={(e) => dragEndBoardHandler(e, order)}
      onDragEnd={(e) => dragEndBoardHandler(e, order)}
      onDragOver={(e) => dragOverBoardHandler(e, order)}
      onDrop={(e) => dropBoardHandler(e, order, id)}
      capture={true}
    >
      <h4>{title}</h4>
      {/* <BoardTitleTextarea title={title} /> */}
      {cards.map((card, index) => (
        <BoardCard
          columnId={id}
          card={card}
          key={card.id}
          columnTitle={title}
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
        onClick={(text) => AddTask(text, id)}
      />
    </div>
  );
};

export { BoardListCard };
