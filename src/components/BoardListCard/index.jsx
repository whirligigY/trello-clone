import React, { useState, useEffect } from 'react';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { RenderColumnTitle } from '../RenderColumnTitle';
import { useAuth } from '../../contexts/Auth';

const BoardListCard = ({
  title,
  columnId,
  columnOrder,
  cards,
  AddTask,
  index,
  updateColumnTitle,
  updateCardTitle,
  handleCardDelete,
  cardsVisible,
  handleColumnDelete,
  boardId,
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

  /* board labels*/
  const [labels, setLabels] = useState([]);
  const [labelsUpdate, setLabelsUpdate] = useState(false);

  useEffect(() => {
    client
      .from('boards')
      .select('brd_labels')
      .eq('id', boardId)
      .then(({ data, error }) => {
        if (data) {
          if (data.length > 0) {
            if (!error) {
              setLabels(JSON.parse(data[0].brd_labels));
            }
          }
        }
      });
  }, []);

  useEffect(() => {
    if (labelsUpdate) {
      saveBoardLabels();
      setLabelsUpdate(false);
    }
  }, [labelsUpdate]);

  const saveBoardLabels = async () => {
    const { data, error } = await client
      .from('boards')
      .update({ brd_labels: JSON.stringify(labels) })
      .eq('id', boardId);
  };

  /*end board labels */

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
                      <span
                        className={styles.delete}
                        onClick={(e) =>
                          handleColumnDelete(e, columnId, columnOrder)
                        }
                      >
                        delete
                      </span>
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
                      setLabels={setLabels}
                      labels={labels}
                      setLabelsUpdate={setLabelsUpdate}
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
