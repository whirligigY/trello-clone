import CardItem from "../CardItem/CardItem";
import { React, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";

const ListCards = ({ list }) => {
  // { title, id, cards }

  return (
    <>
      <h4>{list.title}</h4>
      {list.cards.map((card) => (
        <CardItem key={card.id} text={card.text} />
      ))}
      <AddButton text={"задачу"} type={"card"} listId={list.id} />
    </>
  );
};

const style = {
  container: {
    minWidth: "272px",
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 3,
    marginRight: 10,
    height: "fit-content",
  },
};

export default ListCards;
