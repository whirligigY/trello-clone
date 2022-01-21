import React from 'react';

const Card = ({ cardId, listId, board }) => {
  return (
    <>
      {board.board.map((el) => {
        if (el.id === listId) {
          return el.cards.map((item) => {
            if (cardId === item.id) return <h3>{item.text}</h3>;
          });
        }
        return null;
      })}
    </>
  );
};

export default Card;
