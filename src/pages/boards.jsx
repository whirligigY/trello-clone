import React from 'react';
import Card from '../pages/card';
import Board from '../pages/board';

const Boards = ({ match }) => {
  const boardId = Number(match.params.boardId);
  const listId = Number(match.params.listId);
  const cardId = Number(match.params.cardId);
  const boardList = [
    {
      id: 0,
      title: 'Board1',
      board: [
        {
          id: 0,
          title: 'New tasks board1',
          cards: [
            { id: 0, text: 'Task01' },
            { id: 1, text: 'Task02' },
          ],
        },
        {
          id: 1,
          title: 'In progress',
          cards: [
            { id: 0, text: 'Task11' },
            { id: 1, text: 'Task12' },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Board2',
      board: [
        {
          id: 0,
          title: 'New tasks board2',
          cards: [
            { id: 0, text: 'Task01' },
            { id: 1, text: 'Task02' },
          ],
        },
        {
          id: 1,
          title: 'In progress board2',
          cards: [
            { id: 0, text: 'Task11' },
            { id: 1, text: 'Task12' },
          ],
        },
      ],
    },
  ];
  return (
    <>
      {cardId ? (
        <Card
          key={cardId}
          cardId={cardId}
          listId={listId}
          board={boardList[boardId]}
        />
      ) : (
        <Board key={boardId} id={boardId} board={boardList[boardId]} />
      )}
    </>
  );
};

export default Boards;
