import { useSelector } from 'react-redux';
import React from 'react';
import ListCards from '../listCards/listCards';
import AddButton from '../../components/addButton';

const Board = () => {
  const lists = useSelector((state) => state.lists);
  return (
    <div className="board">
      <div className={'container'} style={style.listContainer}>
        {lists.map((list) => (
          <ListCards
            key={list.id}
            title={list.title}
            id={list.id}
            cards={list.cards}
          />
        ))}
        <AddButton text={'еще одну колонку'} type={'list'} />
      </div>
    </div>
  );
};
const style = {
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
};
export default Board;
