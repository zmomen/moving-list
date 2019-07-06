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
