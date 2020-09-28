import { createStore, applyMiddleware } from "redux";
import todoReducers from "../redux/todos/todoReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  todoReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
