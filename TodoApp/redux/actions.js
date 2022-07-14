export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';

export const addTodo = todo => dispatch => {
  dispatch({
    type: ADD_TODO_ITEM,
    payload: {
      id: Math.random(),
      title: todo,
    },
  });
};

export const deleteTodo = todoId => dispatch => {
  dispatch({
    type: DELETE_TODO_ITEM,
    payload: todoId,
  });
};
