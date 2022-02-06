import { useState } from "react";

const useDragDropCards = (
  changeCurrentValue,
  setNewCardState,
  changeDropComponent
) => {
  const dragStartCardHandler = (e, card) => {
    changeCurrentValue(card);
    e.stopPropagation();
    changeDropComponent("card");
  };
  const dragOverCardHandler = (e) => {
    e.preventDefault();
    console.log();
  };

  const dragEndCardHandler = (e) => {};

  const dropCardHandler = (e, card, columnID) => {
    e.preventDefault();
    setNewCardState(columnID, card);
  };
  return {
    dragStartCardHandler,
    dragOverCardHandler,
    dragEndCardHandler,
    dropCardHandler,
  };
};

const useToggleModal = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = (type) =>
    type === "filter" ? setShowFilter(true) : setShowMenu(true);

  const handleClose = (e, type) => {
    console.log("close", e.target);
    type === "filter" ? setShowFilter(false) : setShowMenu(false);
  };
  return { showFilter, showMenu, handleShow, handleClose };
};

export { useDragDropCards, useToggleModal };
