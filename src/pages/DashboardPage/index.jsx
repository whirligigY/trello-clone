import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from './DashboardPage.module.css';

import { BoardListCard } from '../../components/BoardListCard';
import { AddButton } from '../../components/AddButton';

import { BoardNavigation } from '../../components/BoardNavigation';
import {
  sortCards,
  sortColumns,
  getCardsAfterDragAndDrop,
  getColumnsAfterDragAndDrop,
} from '../../utils';
import { BoardAside } from '../../components/BoardAside';
import { useAuth } from '../../contexts/Auth';

// TODO: Объект задачи отдельная сущность, массив с досками о
//  тдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок

// TODO: Колонка это отдельный компонент который должен сделать
//  фетч всех задач и отрендерить в себе только те которые привязаны к ней

// TODO: Постоянный перерендер. Исправить срочно!!!
const DashboardPage = () => {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const { user, client } = useAuth();
  const { boardId } = useParams();

  const getData = useCallback(
    async (type, id) => {
      if (type === 'columns') {
        const res = await client
          .from('tsk_columns')
          .select('*')
          .eq('col_boardid', id);
        const { data, error } = res;
        if (!error) {
          data.sort(sortColumns);
          setColumns(data);
        }
      } else {
        const res = await client.from('tsk_cards').select('*');

        const arrColumns = columns.map((el) => el.col_id);

        if (columns.length) {
          const updatedRes = await res.data.filter(
            (el) =>
              el.crd_columnid ===
              arrColumns.find((item) => el.crd_columnid === item)
          );
          updatedRes.sort(sortCards);
          setCards(updatedRes);
        }
      }
    },
    [client, columns]
  );
  /* eslint-disable */
  const getOrderForColumnOrCard = async (id, type) => {
    const res = await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .select('*')
      .eq(type === 'columns' ? 'col_boardid' : 'crd_columnid', id);
    if (res.data) return res.data.length;
  };

  const addColumn = async (text) => {
    const length = await getOrderForColumnOrCard(boardId, 'columns');
    if (length >= 0) {
      await client.from('tsk_columns').insert({
        col_boardid: boardId,
        col_title: text,
        col_order: length + 1,
      });
    }
    getData('columns', boardId);
  };

  const AddTask = async (text, id) => {
    const length = await getOrderForColumnOrCard(id, 'cards');
    if (length >= 0) {
      await client.from('tsk_cards').insert({
        crd_columnid: id,
        crd_title: text,
        crd_description: '',
        crd_datestart: new Date(),
        crd_dateend: new Date(),
        crd_labels: JSON.stringify(''),
        crd_order: length + 1,
      });
      getData('cards', id);
    }
  };

  useEffect(() => {
    getData('cards', null);
    getData('columns', boardId);
  }, []);

  useEffect(() => {
    getData('cards', null);
  }, [columns]);

  const onDragEndHandle = async (result) => {
    if (result.type === 'cards') {
      const updatedCards = getCardsAfterDragAndDrop(result, cards);
      await client.from('tsk_cards').upsert(updatedCards);
      getData('cards', null);
    } else {
      const updatedColumns = getColumnsAfterDragAndDrop(result, columns);
      await client.from('tsk_columns').upsert(updatedColumns);
      getData('columns', updatedColumns[0].col_boardid);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandle}>
      <div className={styles.container}>
        <BoardAside />

        <div className={styles.dashboard_container_right}>
          <BoardNavigation title="First board" />
          <Droppable
            droppableId="all-lists"
            direction="horizontal"
            type="columns"
          >
            {(provided) => (
              <div
                className={styles.list_container}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {user && cards.length ? (
                  columns.map((column, index) => (
                    <BoardListCard
                      title={column['col_title']}
                      id={column['col_id']}
                      key={column['col_id']}
                      cards={cards.filter(
                        (el) => el.crd_columnid === column['col_id']
                      )}
                      AddTask={AddTask}
                      index={index}
                    />
                  ))
                ) : (
                  <p>The board is empty </p>
                )}
                <AddButton
                  text="another column"
                  type="list"
                  placeholder="Enter column title"
                  onClick={addColumn}
                  textBtn="column"
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export { DashboardPage };
