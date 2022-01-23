import { useSelector } from "react-redux";
import { React, useState } from "react";
import ListCards from "../ListCards/ListCards";
import AddButton from "../../components/AddButton/AddButton";
import { useDispatch } from "react-redux";
import { CHANGE_ORDER } from "../../actions/constants";

const Board = () => {
  const lists = useSelector((state) => state.lists);
  const initialState = [
    {
      id: 0,
      title: "Новые",
      cards: [
        {
          id: 0,
          text: "this is the text for task 1",
        },
        {
          id: 1,
          text: "this is the text for task 2",
        },
      ],
    },
    {
      id: 1,
      title: "В работе",
      cards: [
        {
          id: 0,
          text: "this is the text for new task ",
        },
        {
          id: 1,
          text: "this is the text for new new task ",
        },
        {
          id: 2,
          text: "this is the text for new new new task ",
        },
      ],
    },
  ];

  const dispatch = useDispatch();
  const [currentBoard, setCurrentBoard] = useState(null);

  function dragStartBoardHandler(e, board) {
    //if (e.target.className !== 'card-item') {
    setCurrentBoard(() => {
      return board;
    });
    //}
  }

  function dragEndBoardHandler(e) {}

  function dragOverBoardHandler(e) {
    e.preventDefault();
    e.target.style.background = "light";
  }

  function dropBoardHandler(e, board) {
    e.preventDefault();
    dispatch({ type: CHANGE_ORDER, payload: { board, currentBoard } });
    /* //if (e.target.className === 'board') {
  setBoards(
    boards.map((el) => {
      if (board.id === el.id) return { ...el, order: currentBoard.order };
      if (currentBoard.id === el.id) return { ...el, order: board.order };
      return el;
    }),
  );
  //}
  /*if (e.target.className === 'card-item') {
    boards.items.push(currentCard);
    const index = currentCardBoard.items.indexOf(currentCard);
    currentCardBoard.items.splice(index, 1);
    setBoards(
      boards.map((el) => {
        if (el.id === board.id) return board;
        if (el.id === currentCardBoard.id) return currentCardBoard;
        return el;
      }),
    );
  }*/
  }

  const sortBoards = (a, b) => {
    if (a.order > b.order) return 1;
    else return -1;
  };

  return (
    <div className="board">
      <div className={"container"} style={style.listContainer}>
        {lists.sort(sortBoards).map((list) => (
          <div
            className="list-card"
            style={style.container}
            draggable={true}
            onDragStart={(e) => {
              dragStartBoardHandler(e, list);
            }}
            onDragLeave={(e) => {
              dragEndBoardHandler(e);
            }}
            onDragEnd={(e) => {
              dragEndBoardHandler(e);
            }}
            onDragOver={(e) => {
              dragOverBoardHandler(e);
            }}
            onDrop={(e) => {
              dropBoardHandler(e, list);
            }}
          >
            <ListCards key={Number(list.id)} list={list} />
          </div>
        ))}
        <AddButton text={"еще одну колонку"} type={"list"} />
      </div>
    </div>
  );
};
const style = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    minWidth: "272px",
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 3,
    marginRight: 10,
    height: "fit-content",
  },
};
export default Board;
