import React from 'react';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';

import { useDragDropCards } from '../../pages/DashboardPage/hooks';

const BoardListCard = ({
  colTitle,
  colId,
  colOrder,
  dropBoardHandler,
  dragStartBoardHandler,
  dragOverBoardHandler,
  dragEndBoardHandler,
  changeCurrentValue,
  getNewCardState,
  cards,
  AddTask,
  changeDropComponent
}) => {
  const {
    dragStartCardHandler,
    dragOverCardHandler,
    dragEndCardHandler,
    dropCardHandler
  } = useDragDropCards(
    changeCurrentValue,
    getNewCardState,
    changeDropComponent
  );

  return (
    <div
      className={styles.container}
      draggable
      onDragStart={(e) => dragStartBoardHandler(e, colOrder)}
      onDragLeave={(e) => dragEndBoardHandler(e, colOrder)}
      onDragEnd={(e) => dragEndBoardHandler(e, colOrder)}
      onDragOver={(e) => dragOverBoardHandler(e, colOrder)}
      onDrop={(e) => dropBoardHandler(e, colOrder, colId)}
      capture
    >
      <h4>{colTitle}</h4>
      {/* <BoardTitleTextarea title={title} /> */}
      {cards.length &&
        cards.map((card) => (
          <BoardCard
            key={card.id}
            columnId={colId}
            card={card}
            columnTitle={colTitle}
            dragStartCardHandler={dragStartCardHandler}
            dragOverCardHandler={dragOverCardHandler}
            dragEndCardHandler={dragEndCardHandler}
            dropCardHandler={dropCardHandler}
          />
        ))}
      <AddButton
        text="task"
        type="card"
        listId={colId}
        placeholder="Enter a title for this card"
        textBtn="task"
        onClick={(text) => AddTask(text, colId)}
      />
    </div>
  );
};

export { BoardListCard };
