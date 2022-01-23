import React from 'react';

const Board = ({ match }) => {
  const board = Number(match.params.board);
  const boardId = Number(match.params.boardId);
  return (
    <>
      <h1>{board.title}</h1>
    </>
  );
};

export default Board;
