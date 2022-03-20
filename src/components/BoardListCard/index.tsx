import React, { useState, useEffect, FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { RenderColumnTitle } from '../RenderColumnTitle';
import { useAuth } from '../../contexts/Auth';
import { BoardListCardProps } from './index.props';
import { Label } from './index.props';

const BoardListCard: FC<BoardListCardProps> = ({
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
  getData,
}) => {
  const [isEditTitleColumn, setIsEditTitleColumn] = useState(false);
  const { client } = useAuth();

  const upsertTitle = async (val: string, idColumn: number) => {
    await client
      .from('tsk_columns')
      .upsert([{ col_id: idColumn, col_title: val }]);
  };

  const handleBlur = (val: string, idCol: number) => {
    updateColumnTitle(val, idCol);
    setIsEditTitleColumn(false);
    upsertTitle(val, idCol);
  };

  /* board labels*/
  const [labels, setLabels] = useState<Label[]>([]);
  const [labelsUpdate, setLabelsUpdate] = useState<boolean>(false);

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
    getData('cards', null);
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
                      onClick={() => setIsEditTitleColumn(true)}
                    >
                      <h4>{title}</h4>
                      <button
                        className={styles.delete}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleColumnDelete(e, columnId, columnOrder)
                        }
                      >
                        delete
                      </button>
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
                      cardId={Number(card.crd_id)}
                      cardIndex={ind}
                      updateCardTitle={updateCardTitle}
                      handleCardDelete={handleCardDelete}
                      cardsVisible={cardsVisible}
                      setLabels={setLabels}
                      labels={labels}
                      setLabelsUpdate={setLabelsUpdate}
                      getData={getData}
                    />
                  ))}
                {provided.placeholder}
                <AddButton
                  type="card"
                  placeholder="Enter a title for this card"
                  textBtn="task"
                  onClick={(text: string) => AddTask(text, columnId)}
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
