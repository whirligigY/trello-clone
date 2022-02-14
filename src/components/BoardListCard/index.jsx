import React, { useState, useEffect } from 'react';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { BoardTitleTextarea } from '../BoardTitleTextarea';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const BoardListCard = ({
  col_title,
  col_id,
  col_order,
  cards,
  AddTask,
  index
}) => {
  const title = col_title;
  const id = col_id;
  const order = col_order;
  return (
    <Draggable draggableId={`${col_id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${col_id}`} type="cards">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.container}
              >
                <h4>{title}</h4>
                {/* <BoardTitleTextarea title={title} /> */}

                {cards.length &&
                  cards.map((card, index) => (
                    <BoardCard
                      key={card.crd_id}
                      columnId={id}
                      card={card}
                      columnTitle={title}
                      cardId={card.crd_id}
                      cardIndex={index}
                    />
                  ))}
                {provided.placeholder}
                <AddButton
                  text={'task'}
                  type={'card'}
                  listId={id}
                  placeholder={'Enter a title for this card'}
                  textBtn={'task'}
                  onClick={(text) => AddTask(text, id)}
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
