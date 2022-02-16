
import React, { useState } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { RenderColumnTitle } from '../RenderColumnTitle';
import { useAuth } from '../../contexts/Auth';

const BoardListCard = ({
  title,
  id,
  cards,
  AddTask,
  index,
  boardId,
  getData
}) => {
  const [isEditTitleColumn, setIsEditTitleColum] = useState(false);
  const { client } = useAuth();

  const handleBlur = async (val, idColumn) => {
    setIsEditTitleColum(false);
    console.log(val);
    await client
      .from('tsk_columns')
      .upsert([{ col_id: idColumn, col_title: val }]);
    getData('columns', boardId);
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`${id}`} type="cards">
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
                      id={id}
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

                {cards.length > 0 &&
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
};


export { BoardListCard };
