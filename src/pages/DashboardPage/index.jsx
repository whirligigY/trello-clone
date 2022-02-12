import React, { useEffect, useState } from 'react';
import styles from './DashboardPage.module.css';
import { BoardListCard } from '../../components/BoardListCard';
import { AddButton } from '../../components/AddButton';
import { getNewList, useDragDrop, sortColumns } from '../../utils';
import { BoardNavigation } from '../../components/BoardNavigation';
import { getNewTask } from '../../utils';
import { BoardAside } from '../../components/BoardAside';
import { useAuth } from '../../contexts/Auth';
import { createStoreHook } from 'react-redux';

// TODO: Объект задачи отдельная сущность, массив с досками отдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок
// TODO: Колонка это отдельный компонент который должен сделать фетч всех задач и отрендерить в себе только те которые привязаны к ней
const DashboardPage = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [dropComponent, setDropComponent] = useState(null);
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
      console.log('columns.length', columns.length);
      if (columns.length) {
        const arrColumns = columns.map((el) => el.col_id);
        console.log(res.data, columns, arrColumns);

        const updatedRes = await res.data.filter(
          (el) =>
            el.crd_columnid ===
            arrColumns.find((item) => el.crd_columnid === item)
        );
        if (!res.error) {
          setCards(updatedRes);
        }
      }
    }
  };

  const addColumn = async (text) => {
    const res = await client
      .from('tsk_columns')
      .select('*')
      .eq('col_boardid', boardId);

    let length = 0;
    if (res.count) {
      length = res.count + 1;
    }
    const data = await client.from('tsk_columns').insert({
      col_boardid: boardId,
      col_title: text,
      col_order: length
    });
    getData('columns', boardId);
  };
  const swapColumnIndex = (dragOrder, dropOrder) => {
    const getColumn = (col, pos) => {
      return { ...col, order: pos };
    };
    setColumns(
      columns.map((column) => {
        if (column.order === dragOrder) return getColumn(column, dropOrder);
        if (column.order === dropOrder) return getColumn(column, dragOrder);
        return column;
      })
    );
  };

  const getNewCardState = (columnID, card) => {
    currentCard.columnId = columnID;
    let newCards = cards.filter((el) => el.id !== currentCard.id);
    if (!card) {
      newCards.push(currentCard);
    } else {
      newCards.splice(
        newCards.findIndex((el) => el.id === card.id) + 1,
        0,
        currentCard
      );
    }
    setCards([...newCards]);
  };

  const changeDropComponent = (component) => {
    setDropComponent(component);
  };

  const {
    dragStartBoardHandler,
    dragOverBoardHandler,
    dragEndBoardHandler,
    dropBoardHandler
  } = useDragDrop(
    swapColumnIndex,
    cards,
    dropComponent,
    changeDropComponent,
    getNewCardState
  );

  const changeCurrentValue = (card) => {
    setCurrentCard(card);
  };

  const AddTask = async (text, id) => {
    const data = await client.from('tsk_cards').insert({
      crd_columnid: id,
      crd_title: text,
      crd_description: '',
      crd_datestart: new Date(),
      crd_dateend: new Date(),
      crd_labels: JSON.stringify('')
    });
    getData('cards', id);
    // const newTask = getNewTask(cards.length, text, id)
    // setCards([...cards, newTask])
  };

  useEffect(() => {
    getData('columns', boardId);
    //if (columns.length) {
    // console.log('columns.length', columns.length);
    getData('cards', null);
    //}
  }, []);

  useEffect(() => {
    getData('cards', null);
  }, [columns]);

  return (
    <div className={styles.container}>
      <BoardAside />
      <div className={styles.dashboard_container_right}>
        <BoardNavigation title="First board" />
        <div className={styles.list_container}>
          {user ? (
            columns
              .sort(sortColumns)
              .map((column) => (
                <BoardListCard
                  {...column}
                  key={column.col_id}
                  dropBoardHandler={dropBoardHandler}
                  dragStartBoardHandler={dragStartBoardHandler}
                  dropBoardHandler={dropBoardHandler}
                  dragOverBoardHandler={dragOverBoardHandler}
                  dragEndBoardHandler={dragEndBoardHandler}
                  changeCurrentValue={changeCurrentValue}
                  cards={cards}
                  currentCard={currentCard}
                  AddTask={AddTask}
                  getNewCardState={getNewCardState}
                  changeDropComponent={changeDropComponent}
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
        </div>
      </div>
    </div>
  );
};

export { DashboardPage };
