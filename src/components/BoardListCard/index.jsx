import React, { useState } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { RenderColumnTitle } from '../RenderColumnTitle';
import { useAuth } from '../../contexts/Auth';

const BoardListCard = ({
  title,
  columnId,
  cards,
  AddTask,
  index,
  updateColumnTitle,
  updateCardTitle,
  handleCardDelete,
  cardsVisible,
}) => {
  const [isEditTitleColumn, setIsEditTitleColum] = useState(false);
  const { client } = useAuth();

  const upsertTitle = async (val, idColumn) => {
    await client
      .from('tsk_columns')
      .upsert([{ col_id: idColumn, col_title: val }]);
  };

  const handleBlur = (val, idCol) => {
    updateColumnTitle(val, idCol);
    setIsEditTitleColum(false);
    upsertTitle(val, idCol);
  };

  return (
    <Draggable draggableId={`${columnId}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${columnId}`} type="cards">
            {/* eslint-disable */}
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.container}
              >
                <div>
                  {isEditTitleColumn ? (
                    <RenderColumnTitle
                      title={title}
                      handleBlur={handleBlur}
                      id={columnId}
                    />
                  ) : (
                    <div
                      className={styles.title_container}
                      onClick={() => setIsEditTitleColum(true)}
                    >
                      <h4>{title}</h4>
                      <span>delete</span>
                    </div>
                  )}
                </div>

                {cards?.length > 0 &&
                  cards.map((card, ind) => (
                    <BoardCard
                      key={card.crd_id}
                      columnId={columnId}
                      card={card}
                      columnTitle={title}
                      cardId={card.crd_id}
                      cardIndex={ind}
                      updateCardTitle={updateCardTitle}
                      handleCardDelete={handleCardDelete}
                      cardsVisible={cardsVisible}
                    />
                  ))}
                {provided.placeholder}
                <AddButton
                  text="task"
                  type="card"
                  listId={columnId}
                  placeholder="Enter a title for this card"
                  textBtn="task"
                  onClick={(text) => AddTask(text, columnId)}
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export { BoardListCard };
