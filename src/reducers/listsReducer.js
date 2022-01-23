import { ADD_LIST, ADD_CARD, CHANGE_ORDER } from '../actions/constants';

const initialState = [
  {
    id: 0,
    title: 'Новые',
    order: 1,
    cards: [
      {
        id: 0,
        text: 'this is the text for task 1',
      },
      {
        id: 1,
        text: 'this is the text for task 2',
      },
    ],
  },
  {
    id: 1,
    title: 'В работе',
    order: 2,
    cards: [
      {
        id: 0,
        text: 'this is the text for new task ',
      },
      {
        id: 1,
        text: 'this is the text for new new task ',
      },
      {
        id: 2,
        text: 'this is the text for new new new task ',
      },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      const newList = {
        id: state.length,
        title: action.payload.text,
        order: state.length + 1,
        cards: [],
      };
      return [...state, newList];

    case ADD_CARD:
      const newTask = {
        id: state[action.payload.id].cards.length,
        text: action.payload.text,
      };
      return state.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, cards: [...item.cards, newTask] };
        return { ...item };
      });

    case CHANGE_ORDER:
      return state.map((el) => {
        if (action.payload.board.id === el.id) {
          return {
            ...el,
            order: action.payload.currentBoard.order,
          };
        }

        if (action.payload.currentBoard.id === el.id) {
          return {
            ...el,
            order: action.payload.board.order,
          };
        }

        return el;
      });

    default:
      return state;
  }
};
export default listsReducer;
