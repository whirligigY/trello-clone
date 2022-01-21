import CardItem from '../cardItem/cardItem';
import React from 'react';
import AddButton from '../../components/addButton';

const ListCards = ({ title, id, cards }) => {
  return (
    <div className="list-card" style={style.container}>
      <h4>{title}</h4>
      {cards.map((card) => (
        <CardItem key={card.id} text={card.text} />
      ))}
      <AddButton text={"задачу"} type={'card'} listId={id}/>
    </div>
  );
};

const style = {
  container: {
    minWidth: '272px',
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 3,
    marginRight: 10,
    height: 'fit-content',
  },
};

export default ListCards;
