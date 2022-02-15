import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';

const BoardListCard = ({ title, id, cards, AddTask, index }) => (
  <Draggable draggableId={`${id}`} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {/* eslint-disable */}
        <Droppable droppableId={`${id}`} type="cards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.container}
            >
              <h4>{title}</h4>
              {cards.length &&
                cards.map((card, ind) => (
                  <BoardCard
                    key={card.crd_id}
                    columnId={id}
                    card={card}
                    columnTitle={title}
                    cardId={card.crd_id}
                    cardIndex={ind}
                  />
                ))}
              {provided.placeholder}
              <AddButton
                text="task"
                type="card"
                listId={id}
                placeholder="Enter a title for this card"
                textBtn="task"
                onClick={(text) => AddTask(text, id)}
              />
            </div>
          )}
        </Droppable>
      </div>
    )}
  </Draggable>
);

export { BoardListCard };
