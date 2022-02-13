import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import { BoardListCard } from '../../components/BoardListCard';
import { AddButton } from '../../components/AddButton';
import { BoardNavigation } from '../../components/BoardNavigation';
import { sortCards, getCardsAfterDragAndDrop } from '../../utils';
import { BoardAside } from '../../components/BoardAside';
import { useAuth } from '../../contexts/Auth';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// TODO: Объект задачи отдельная сущность, массив с досками отдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок
// TODO: Колонка это отдельный компонент который должен сделать фетч всех задач и отрендерить в себе только те которые привязаны к ней
const DashboardPage = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const { user, client } = useAuth();

  const getData = async (type, id) => {
    if (type === 'columns') {
      const res = await client
        .from('tsk_columns')
        .select('*')
        .eq('col_boardid', id);
      if (!res.error) {
        setColumns(res.data);
      }
    } else {
      const res = await client.from('tsk_cards').select('*');
      const arrColumns = columns.map((el) => el.col_id);

      if (columns.length) {
        let updatedRes = await res.data.filter(
          (el) =>
            el.crd_columnid ===
            arrColumns.find((item) => el.crd_columnid === item)
        );
        updatedRes.sort(sortCards);
        setCards(updatedRes);
      }
    }
  };

  const getOrderForColumnOrCard = async (id, type) => {
    const res = await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .select('*')
      .eq(type === 'columns' ? 'col_boardid' : 'crd_columnid', id);
    if (res.data) return res.data.length;
    return;
  };

  const addColumn = async (text) => {
    const length = await getOrderForColumnOrCard(boardId, 'columns');
    if (length >= 0) {
      const data = await client.from('tsk_columns').insert({
        col_boardid: boardId,
        col_title: text,
        col_order: length + 1
      });
    }
    getData('columns', boardId);
  };

  const AddTask = async (text, id) => {
    const length = await getOrderForColumnOrCard(id, 'cards');
    if (length >= 0) {
      const data = await client.from('tsk_cards').insert({
        crd_columnid: id,
        crd_title: text,
        crd_description: '',
        crd_datestart: new Date(),
        crd_dateend: new Date(),
        crd_labels: JSON.stringify(''),
        crd_order: length + 1
      });
      getData('cards', id);
    }
  };

  useEffect(() => {
    getData('columns', boardId);
    getData('cards', null);
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
      console.log(result);
      console.log(columns);
      //const updatedColumns
      //await client.from('tsk_columns').upsert(updatedColumns);
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
                {user ? (
                  columns.map((column, index) => (
                    <BoardListCard
                      {...column}
                      key={column.col_id}
                      cards={cards.filter(
                        (el) => el.crd_columnid === column.col_id
                      )}
                      AddTask={AddTask}
                      index={index}
                    />
                  ))
                ) : (
                  <p>The board is empty </p>
                )}
                <AddButton
                  text={'another column'}
                  type={'list'}
                  placeholder={'Enter column title'}
                  onClick={addColumn}
                  textBtn={'column'}
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
