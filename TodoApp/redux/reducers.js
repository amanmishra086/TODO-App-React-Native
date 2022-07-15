import {ADD_TODO_ITEM, DELETE_TODO_ITEM} from './actions';

const initialState = {
  list: [
    {
      id: '1',
      title: 'my first task',
    },
    {
      id: '2',
      title: 'my second task',
    },
  ],
};

export default useReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_ITEM:
      const {id, title} = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            title: title,
          },
        ],
      };
    case DELETE_TODO_ITEM:
      const filteredTodos = state.list.filter(t => t.id !== action.payload);
      return {
        ...state,
        list: filteredTodos,
      };
    default:
      return state;
  }
};
