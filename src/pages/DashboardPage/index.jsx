import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styles from './DashboardPage.module.css';
import {
  sortCards,
  sortColumns,
  getCardsAfterDragAndDrop,
  getColumnsAfterDragAndDrop,
  getNewColumn,
  getNewCard,
  getNewColumnsArr,
} from '../../utils';
import { BoardListCard } from '../../components/BoardListCard';
import { AddButton } from '../../components/AddButton';
import { BoardNavigation } from '../../components/BoardNavigation';
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
  const [changeCardPos, setChangeCardPos] = useState(false);
  const { user, client } = useAuth();
  const { boardId } = useParams();
  const [boardTitle, setBoardTitle] = useState({});
  const inputSearch = useInput();
  const { value } = inputSearch;
  const boardID = Number(boardId);

  const [downloadCard, setDownloadCard] = useState(true);

  const getData = async (type, id) => {
    if (type === 'columns') {
      const { data } = await client
        .from('tsk_columns')
        .select('*')
        .eq('col_boardid', id);
      data.sort(sortColumns);
      setColumns(data);
    } else {
      const { data } = await client.from('tsk_cards').select('*');
      const res = await client
        .from('tsk_columns')
        .select('*')
        .eq('col_boardid', boardID);
      if (data && res.data && data.length > 0) {
        const arrColumns = res.data.map((el) => el.col_id);
        /*const cardsNew = [];
        columns.forEach(async (el, index, arr) => {
          const { data } = await client
            .from('tsk_cards')
            .select('*')
            .eq('crd_columnid', el.col_id);
          cardsNew.push(...data);
          if (index === arr.length - 1) {
            cardsNew.sort(sortCards);
            //setCards(updatedRes);
          }
         
        }); */
        const updatedRes = await data.filter(
          (el) =>
            el.crd_columnid ===
            arrColumns.find((item) => el.crd_columnid === item)
        );
        console.log(
          'data.length',
          data.length,
          'arrColumns',
          arrColumns,
          'columns',

          columns,

          'updatedRes',
          updatedRes
        );
        updatedRes.sort(sortCards);
        setCards(updatedRes);
      }
    }
  };
  const getBoardData = async () => {
    const { data } = await client.from('boards').select('*').eq('id', boardID);
    const res = await client.from('profiles').select('*').eq('id', user.id);
    setBoardTitle({ title: data[0].title, username: res.data[0].username });
  };
  /* eslint-disable */
  const writeColumnToDatabase = async (id, newObj) => {
    await client.from('tsk_columns').insert([newObj]);
    const { data } = await client
      .from('tsk_columns')
      .select('*')
      .eq('col_boardid', id);
    //data.sort(sortColumns);
    //setColumns(data);
  };
  const addColumn = (text, boardID) => {
    const newCol = getNewColumn(boardID, text, columns);
    setColumns([...columns, newCol]);
    writeColumnToDatabase(boardID, newCol);
  };

  const writeCardToDataBase = async (newObj) => {
    await client.from('tsk_cards').insert([newObj]);
    //getData('cards', null);
    /*if (columns.length) {
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
    */
  };

  const AddTask = (text, idColumn) => {
    const numElemInColumn = cards.filter((el) => el.crd_columnid === idColumn);
    const newCard = getNewCard(idColumn, text, numElemInColumn);
    setCards([...cards, newCard]);
    writeCardToDataBase(newCard);
  };

  useEffect(() => {
    getData('columns', boardID);
    getData('cards', null);
    getBoardData();
  }, []);

  useEffect(() => {
    getData('cards', null);
  }, [columns]);

  useEffect(() => {
    client
      .from('tsk_columns')
      .on('*', () => {
        console.log('changed columns');
        getData('columns', boardID);
      })
      .subscribe();
    client
      .from('tsk_cards')
      .on('*', () => {
        console.log('changed card');
        getData('cards', null);
      })
      .subscribe();
  }, [client]);

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

  const onDragEndHandle = async (result) => {
    if (result.type === 'cards') {
      setChangeCardPos((prev) => !prev);
      console.log('result', result, 'cards', cards);
      const updatedCards = getCardsAfterDragAndDrop(result, cards) ?? cards;

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
      await client.from('tsk_cards').upsert([...cardsUnion]);
      //setDownloadCard(true);
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

  const updateDatabase = async (updatedCardsArr) => {
    await client.from('tsk_cards').upsert([...updatedCardsArr]);
  };

  const handleCardDelete = (cardId, columnId, cardOrder) => {
    console.log('columnId', columnId, 'cardOrder', cardOrder);
    const catdsArrWithNewOrder = cards.map((el) => {
      if (el.crd_columnid === columnId && el.crd_order > cardOrder) {
        console.log('el', { ...el, crd_order: el.crd_order - 1 });
        return { ...el, ['crd_order']: el.crd_order - 1 };
      } else {
        return el;
      }
    });
    const updatedCardsArr = catdsArrWithNewOrder.filter(
      (card) => card.crd_id !== cardId
    );
    console.log('updatedCardsArr', updatedCardsArr);
    setCards(updatedCardsArr);
    deleteElemFromDatabase(cardId);
    updateDatabase(updatedCardsArr);
    /*updateTable(
      'cards',
      updatedCardsArr.filter((el) => el.crd_columnid === columnId)
    );*/
  };

  const handleColumnDelete = async (e, columnId, colOrder) => {
    e.stopPropagation();
    const { data, error } = await client
      .from('tsk_cards')
      .select('*')
      .eq('crd_columnid', columnId);
    if (!error && data.length === 0) {
    } else if (!error && data.length > 0) {
      const filteredCards = cards.filter((el) => el.crd_columnid !== columnId);
      setCards(filteredCards);
      await client.from('tsk_cards').delete().match({ crd_columnid: columnId });
    }
    const updatedColumns = getNewColumnsArr(columns, columnId, colOrder);
    setColumns(updatedColumns);
    await client.from('tsk_columns').upsert(updatedColumns);
    await client.from('tsk_columns').delete().match({ col_id: columnId });
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
                      boardId={boardID}
                      getData={getData}
                      updateColumnTitle={updateColumnTitle}
                      updateCardTitle={updateCardTitle}
                      handleCardDelete={handleCardDelete}
                      cardsVisible={cardsVisible}
                      handleColumnDelete={handleColumnDelete}
                      boardId={boardID}
                      changeCardPos={changeCardPos}
                      downloadCard={downloadCard}
                      setDownloadCard={setDownloadCard}
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
