import React, { useState, useEffect } from 'react';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
//import { BoardTitleTextarea } from '../BoardTitleTextarea';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const BoardListCard = ({
  title,
  id,
  cards,
  AddTask,
  index
}) => {
  
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${id}`} type="cards">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.container}
              >
                <h4>{title}</h4>

                {cards.length>0 &&
                  cards.map((card, index) => (
                    <BoardCard
                      key={card["crd_id"]}
                      columnId={id}
                      card={card}
                      columnTitle={title}
                      cardId={card["crd_id"]}
                      cardIndex={index}
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
};

export { BoardListCard };
