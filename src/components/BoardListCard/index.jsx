import React, { useState, useEffect } from 'react';
import styles from './BoardListCard.module.css';
import { BoardCard } from '../BoardCard';
import { AddButton } from '../AddButton';
import { getNewTask } from '../../utils';
import { BoardTitleTextarea } from '../BoardTitleTextarea';

const BoardListCard = ({
  title,
  id,
  order,
  dropBoardHandler,
  dragStartBoardHandler,
  dragOverBoardHandler,
  dragEndBoardHandler,
}) => {
  function AddTask(text) {
    const newTask = getNewTask(cards.length, text, id);
    setCards([...cards, newTask]);
  }
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    const response = await fetch('mocks/tasks.json');
    const data = await response.json();
    setCards(data);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div
      className={styles.container}
      draggable={true}
      onDragStart={(e) => dragStartBoardHandler(e, order)}
      onDragLeave={dragEndBoardHandler}
      onDragEnd={dragEndBoardHandler}
      onDragOver={dragOverBoardHandler}
      onDrop={(e) => dropBoardHandler(e, order)}
    >
      <h4 className={styles.title_hide}>{title}</h4>
      <BoardTitleTextarea title={title} />
      {cards.map((card) => (
        <BoardCard columnId={id} card={card} key={card.id} columnTitile={title}/>
      ))}
      <AddButton
        text={'task'}
        type={'card'}
        listId={id}
        placeholder={'Enter a title for this card'}
        textBtn={'task'}
        onClick={AddTask}
      />
    </div>
  );
};

export { BoardListCard };
