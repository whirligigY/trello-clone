import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './DashboardPage.module.css';

import { BoardListCard } from '../../components/BoardListCard';
import { AddButton } from '../../components/AddButton';

import { BoardNavigation } from '../../components/BoardNavigation';
import {
  sortCards,
  sortColumns,
  getCardsAfterDragAndDrop,
  getColumnsAfterDragAndDrop,
  getNewColumn,
  getNewCard,
} from '../../utils';
import { BoardAside } from '../../components/BoardAside';
import { useAuth } from '../../contexts/Auth';
import { useInput } from '../../hooks/useInput';
import { BgContext } from '../../contexts/BgContext';
import {
  ColumnType,
  CardType,
  boardTitleProps,
  ArrVisibleProps,
} from './index.props';

const DashboardPage = () => {
  const [columns, setColumns] = useState<ColumnType[] | []>([]);
  const [cards, setCards] = useState<CardType[] | []>([]);
  const [cardsVisible, setCardsVisible] = useState<ArrVisibleProps[] | []>([]);
  const [changeCardPos, setChangeCardPos] = useState(false);
  const { user, client } = useAuth();
  const { boardId } = useParams();
  const initial: boardTitleProps = {
    title: '',
    username: '',
  };
  const [boardTitle, setBoardTitle] = useState(initial);
  const inputSearch = useInput('') as {
    value: string;
    onChange: (
      ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined
    ) => void;
    onClear: () => void;
  };

  const boardID = Number(boardId);
  const { changeWrapperBg } = useContext(BgContext);

  const getData = async (type: string, id: number | null) => {
    if (type === 'columns') {
      const { data } = await client
        .from('tsk_columns')
        .select('*')
        .eq('col_boardid', id);
      data.sort(sortColumns);
      setColumns(data);
    } else {
      const res = await client.from('tsk_cards').select('*');

      const arrColumns = columns.map((el: ColumnType) => el.col_id);
      if (columns.length) {
        const updatedRes = await res.data.filter(
          (el: CardType) =>
            el.crd_columnid ===
            arrColumns.find((item) => el.crd_columnid === item)
        );

        updatedRes.sort(sortCards);
        setCards(updatedRes);
      }
    }
  };
  const getBoardData = async () => {
    const { data } = await client.from('boards').select('*').eq('id', boardID);
    const res = await client.from('profiles').select('*').eq('id', user.id);
    console.log(res.data[0].username);
    setBoardTitle({ title: data[0].title, username: res.data[0].username });
  };
  /* eslint-disable */
  const getOrderForColumnOrCard = async (id: number, type: string) => {
    const res = await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .select('*')
      .eq(type === 'columns' ? 'col_boardid' : 'crd_columnid', id);
    if (res.data) return res.data.length;
  };

  const writeColumnToDatabase = async (id: number, newObj: ColumnType) => {
    await client.from('tsk_columns').insert([newObj]);
    const { data } = await client
      .from('tsk_columns')
      .select('*')
      .eq('col_boardid', id);
    data.sort(sortColumns);
    setColumns(data);
  };

  const addColumn = (text: string, boardID: number): void => {
    const newCol: ColumnType = getNewColumn(boardID, text, columns);
    setColumns([...columns, newCol]);
    writeColumnToDatabase(boardID, newCol);
  };

  const writeCardToDataBase = async (newObj: CardType) => {
    await client.from('tsk_cards').insert([newObj]);
    if (columns.length) {
      const { data } = await client.from('tsk_cards').select('*');
      const arrColumns = columns.map((el: ColumnType) => el.col_id);
      const updatedRes = data.filter(
        (el: CardType) =>
          el.crd_columnid ===
          arrColumns.find((item) => el.crd_columnid === item)
      );
      if (updatedRes.length > 2) updatedRes.sort(sortCards);
      setCards(updatedRes);
    }
  };

  const AddTask = (text: string, idColumn: number): void => {
    const numElemInColumn = cards.filter(
      (el: CardType) => el.crd_columnid === idColumn
    );
    const newCard = getNewCard(idColumn, text, numElemInColumn);
    const arrayForSet: CardType[] = [...cards, newCard];
    setCards(arrayForSet);
    writeCardToDataBase(newCard);
  };

  const getBackground = async (id: number) => {
    const { data } = await client
      .from('boards')
      .select('background')
      .eq('id', id);
    changeWrapperBg(data[0].background);
  };

  useEffect(() => {
    //getBackground();
    getData('cards', null);
    getData('columns', boardID);
    getBoardData();
  }, []);

  useEffect(() => {
    getData('cards', null);
  }, [columns]);

  useEffect(() => {
    if (cards && cards.length) {
      const ar = cards.map((el) => {
        if (
          el.crd_title &&
          el.crd_title.toLowerCase().indexOf(inputSearch.value) >= 0
        ) {
          return { crd_id: el.crd_id, visible: true };
        }
        return { crd_id: el.crd_id, visible: false };
      });
      setCardsVisible(ar);
    }
  }, [inputSearch.value]);

  const updateTable = async (type: string, arr: CardType[] | ColumnType[]) => {
    await client
      .from(type === 'columns' ? 'tsk_columns' : 'tsk_cards')
      .upsert(arr);
  };

  const onDragEndHandle = async (result: DropResult) => {
    let cardsUnion = [];
    if (result.type === 'cards') {
      setChangeCardPos((prev) => !prev);
      const updatedCards = getCardsAfterDragAndDrop(result, cards) || [];
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
      if (cardsUnion.length > 1) cardsUnion.sort(sortCards);
      setCards(cardsUnion);
      updateTable('cards', updatedCards);
    } else {
      const updatedColumns = getColumnsAfterDragAndDrop(result, columns) || [];
      if (updatedColumns.length > 1) updatedColumns.sort(sortColumns);
      setColumns(updatedColumns);
      await client.from('tsk_columns').upsert([...updatedColumns]);
    }
  };

  const updateColumnTitle = (val: string, idColumn: number) => {
    const newArrColumn = columns.map((col: ColumnType) => {
      if (col.col_id === idColumn) {
        return { ...col, col_title: val };
      }
      return col;
    });
    setColumns(newArrColumn);
  };

  const updateCardTitle = (val: string, cardId: number) => {
    const newArrCard = cards.map((card) => {
      if (card.crd_id === cardId) {
        return { ...card, crd_title: val };
      }
      return card;
    });
    setCards(newArrCard);
  };

  const deleteElemFromDatabase = async (id: number) => {
    await client.from('tsk_cards').delete().match({ crd_id: id });
  };

  const handleCardDelete = (
    cardId: number,
    columnId: number,
    cardOrder: number
  ) => {
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

  const handleColumnDelete = async (
    e: React.MouseEvent,
    columnId: number,
    colOrder: number
  ) => {
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
        <BoardAside username={boardTitle.username} />

        <div className={styles.dashboard_container_right}>
          <BoardNavigation title={boardTitle.title} inputSearch={inputSearch} />
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
                  columns.map((column: ColumnType, index: number) => (
                    <BoardListCard
                      title={column.col_title}
                      columnId={column.col_id}
                      columnOrder={column.col_order}
                      key={column.col_id}
                      cards={cards.filter(
                        (el: CardType) => el.crd_columnid === column.col_id
                      )}
                      AddTask={AddTask}
                      index={index}
                      boardId={boardID}
                      getData={getData}
                      updateColumnTitle={updateColumnTitle}
                      updateCardTitle={updateCardTitle}
                      handleCardDelete={handleCardDelete}
                      cardsVisible={cardsVisible}
                      handleColumnDelete={handleColumnDelete}
                    />
                  ))
                ) : (
                  <p></p>
                )}
                <AddButton
                  type="list"
                  placeholder="Enter column title"
                  onClick={(text: string) => {
                    addColumn(text, boardID);
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
