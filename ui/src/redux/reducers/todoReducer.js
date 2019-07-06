const initialState = {};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TODOS":
      return [...action.payload];
    default:
      return state;
  }
}
