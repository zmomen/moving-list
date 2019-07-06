import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import App from "./App";
import rootReducer from "./redux/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);