import React, { useState, useEffect } from 'react'
import styles from './BoardListCard.module.css'
import { BoardCard } from '../BoardCard'
import { AddButton } from '../AddButton'
import { BoardTitleTextarea } from '../BoardTitleTextarea'
import { useDragDropCards } from '../../pages/DashboardPage/hooks'

const BoardListCard = ({
  col_title,
  col_id,
  col_order,
  dropBoardHandler,
  dragStartBoardHandler,
  dragOverBoardHandler,
  dragEndBoardHandler,
  changeCurrentValue,
  getNewCardState,
  cards,
  AddTask,
  changeDropComponent
}) => {
  const {
    dragStartCardHandler,
    dragOverCardHandler,
    dragEndCardHandler,
    dropCardHandler
  } = useDragDropCards(changeCurrentValue, getNewCardState, changeDropComponent)
  const title = col_title
  const id = col_id
  const order = col_order
  if (cards.length) console.log(cards)
  return (
    <div
      className={styles.container}
      draggable={true}
      onDragStart={(e) => dragStartBoardHandler(e, order)}
      onDragLeave={(e) => dragEndBoardHandler(e, order)}
      onDragEnd={(e) => dragEndBoardHandler(e, order)}
      onDragOver={(e) => dragOverBoardHandler(e, order)}
      onDrop={(e) => dropBoardHandler(e, order, id)}
      capture={true}
    >
      <h4>{title}</h4>
      {/* <BoardTitleTextarea title={title} /> */}
      {cards.length &&
        cards.map((card, index) => (
          <BoardCard
            key={card.id}
            columnId={id}
            card={card}
            columnTitle={title}
            dragStartCardHandler={dragStartCardHandler}
            dragOverCardHandler={dragOverCardHandler}
            dragEndCardHandler={dragEndCardHandler}
            dropCardHandler={dropCardHandler}
          />
        ))}
      <AddButton
        text={'task'}
        type={'card'}
        listId={id}
        placeholder={'Enter a title for this card'}
        textBtn={'task'}
        onClick={(text) => AddTask(text, id)}
      />
    </div>
  )
}

export { BoardListCard }
