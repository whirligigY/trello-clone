import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from './DashboardPage.module.css';
import { getNewColumn, getNewCard } from '../../utils';

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
import { useInput } from '../../hooks/useInput';

// TODO: Объект задачи отдельная сущность, массив с досками о
//  тдельная сущность. Когда открываем страницу Dashboard мы должны сделать фетч всех досок

// TODO: Колонка это отдельный компонент который должен сделать
//  фетч всех задач и отрендерить в себе только те которые привязаны к ней

// TODO: Постоянный перерендер. Исправить срочно!!!
const DashboardPage = () => {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardsVisible, setCardsVisible] = useState([]);
  const { user, client } = useAuth();
  const { boardId } = useParams();
  const inputSearch = useInput();
  const { value } = inputSearch;

  const getData = async (type, id) => {
    if (type === 'columns') {
      const { data } = await client
        .from('tsk_columns')
        .select('*')
        .eq('col_boardid', id);
      data.sort(sortColumns);
      setColumns(data);
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
  };
  /* eslint-disable */
  const getOrderForColumnOrCard = async (id, type) => {
    const res = await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .select('*')
      .eq(type === 'columns' ? 'col_boardid' : 'crd_columnid', id);
    if (res.data) return res.data.length;
  };

  const writeColumnToDatabase = async (id, newObj) => {
    await client.from('tsk_columns').insert([newObj]);
    const { data } = await client
      .from('tsk_columns')
      .select('*')
      .eq('col_boardid', id);
    data.sort(sortColumns);
    setColumns(data);
  };
  const addColumn = (text, boardId) => {
    const newCol = getNewColumn(boardId, text, columns);
    setColumns([...columns, newCol]);
    writeColumnToDatabase(boardId, newCol);
  };

  const writeCardToDataBase = async (newArr) => {
    await client.from('tsk_cards').insert([newArr]);
    if (columns.length) {
      const { data } = await client.from('tsk_cards').select('*');
      const arrColumns = columns.map((el) => el.col_id);
      const updatedRes = data.filter(
        (el) =>
          el.crd_columnid ===
          arrColumns.find((item) => el.crd_columnid === item)
      );
      if (updatedRes.length > 2) updatedRes.sort(sortCards);
      setCards(updatedRes);
    }
  };

  const AddTask = (text, idColumn) => {
    const numElemInColumn = cards.filter((el) => el.crd_columnid === idColumn);
    const newCard = getNewCard(idColumn, text, numElemInColumn);
    setCards([...cards, newCard]);
    writeCardToDataBase(newCard);
  };

  useEffect(() => {
    //getBackground();
    getData('cards', null);
    getData('columns', boardId);
  }, []);

  useEffect(() => {
    getData('cards', null);
  }, [columns]);

  useEffect(() => {
    if (cards.length) {
      const ar = cards.map((el) => {
        if (el.crd_title.toLowerCase().indexOf(value) >= 0) {
          return { crd_id: el.crd_id, visible: true };
        }
        return { crd_id: el.crd_id, visible: false };
      });
      setCardsVisible(ar);
    }
  }, [value]);

  const updateTable = async (type, arr) => {
    await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .upsert(arr);
  };

  const onDragEndHandle = async (result) => {
    if (result.type === 'cards') {
      const updatedCards = getCardsAfterDragAndDrop(result, cards);

      let cardsUnion = [];
      if (updatedCards.length < cards.length) {
        const arrWithoutModifiedElems = cards.filter(
          (card) =>
            card.crd_id !==
            updatedCards
              .map((item) => item.crd_id)
              .find((el) => el === card.crd_id)
        );
        cardsUnion.push(...arrWithoutModifiedElems);
      }
      cardsUnion.push(...updatedCards);
      cardsUnion.sort(sortCards);

      setCards(cardsUnion);
      updateTable('cards', updatedCards);
    } else {
      const updatedColumns = getColumnsAfterDragAndDrop(result, columns);
      updatedColumns.sort(sortColumns);
      setColumns(updatedColumns);
      await client.from('tsk_columns').upsert([...updatedColumns]);
    }
  };

  const updateColumnTitle = (val, idColumn) => {
    const newArrColumn = columns.map((col) => {
      if (col.col_id === idColumn) {
        return { ...col, col_title: val };
      }
      return col;
    });
    setColumns(newArrColumn);
  };

  const updateCardTitle = (val, cardId) => {
    const newArrCard = cards.map((card) => {
      if (card.crd_id === cardId) {
        return { ...card, crd_title: val };
      }
      return card;
    });
    setCards(newArrCard);
  };

  const deleteElemFromDatabase = async (id) => {
    await client.from('tsk_cards').delete().match({ crd_id: id });
  };

  const handleCardDelete = (cardId, columnId, cardOrder) => {
    const catdsArrWithNewOrder = cards.map((el) => {
      if (el.crd_columnid === columnId && el.crd_order > cardOrder) {
        return { ...el, crd_order: el.crd_order - 1 };
      }
      return el;
    });
    const updatedCardsArr = catdsArrWithNewOrder.filter(
      (card) => card.crd_id !== cardId
    );
    setCards(updatedCardsArr);
    deleteElemFromDatabase(cardId);
    updateTable(
      'cards',
      updatedCardsArr.filter((el) => el.crd_columnid === columnId)
    );
  };

  const handleColumnDelete = async (e, columnId, colOrder) => {
    e.stopPropagation();
    const { data, error } = await client
      .from('tsk_cards')
      .select('*')
      .eq('crd_columnid', columnId);
    if (!error && data.length === 0) {
      const columnsWithNewOrder = columns.map((el) => {
        if (el.col_order > colOrder) {
          return { ...el, col_order: el.col_order - 1 };
        }
        return el;
      });
      const updatedColumns = columnsWithNewOrder.filter(
        (col) => col.col_id !== columnId
      );
      setColumns(updatedColumns);
      await client.from('tsk_columns').upsert(updatedColumns);
      await client.from('tsk_columns').delete().match({ col_id: columnId });
    } else if (!error && data.length > 0) {
      //TODO: delete with cards
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandle}>
      <div className={styles.container}>
        <BoardAside />

        <div className={styles.dashboard_container_right}>
          <BoardNavigation title="First board" inputSearch={inputSearch} />
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
                      title={column.col_title}
                      columnId={column.col_id}
                      columnOrder={column.col_order}
                      key={column.col_id}
                      cards={cards.filter(
                        (el) => el.crd_columnid === column.col_id
                      )}
                      AddTask={AddTask}
                      index={index}
                      boardId={boardId}
                      getData={getData}
                      updateColumnTitle={updateColumnTitle}
                      updateCardTitle={updateCardTitle}
                      handleCardDelete={handleCardDelete}
                      cardsVisible={cardsVisible}
                      handleColumnDelete={handleColumnDelete}
                      boardId={boardId}
                    />
                  ))
                ) : (
                  <p></p>
                )}
                <AddButton
                  text="another column"
                  type="list"
                  placeholder="Enter column title"
                  onClick={(text) => {
                    addColumn(text, boardId);
                  }}
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
