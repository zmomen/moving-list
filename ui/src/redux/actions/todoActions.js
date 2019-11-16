import * as api from "../../utils/api";

export const getTodoCategories = () => {
  return dispatch => {
    api.getTodoCategories().then(todos => {
      dispatch({
        type: "GET_TODOS",
        payload: todos.data
      });
    });
  };
};

export const updateTodo = (id, title, desc) => {
  return dispatch => {
    api.updateTodo(id, title, desc).then(todos => {
      dispatch({
        type: "GET_TODOS",
        payload: todos.data
      });
    });
  };
};
