import {ADD_LIST, ADD_CARD} from '../actions/constants'

const initialState = [
  {
    id: 0,
    title: 'Новые',
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
          cards: [],
      }
      return [...state, newList];

      case ADD_CARD:
       const newTask = {
          id: state[action.payload.id].cards.length,
          text: action.payload.text,
      }
      return state.map((item, index) => {
          if (index === action.payload.id) return {...item, cards: [...item.cards, newTask] }
            return {...item}
      });
      
    default:
      return state;
  }
};
export default listsReducer;
