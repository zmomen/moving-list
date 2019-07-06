import { combineReducers } from "redux";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
  articles: todoReducer
});

export default rootReducer;
