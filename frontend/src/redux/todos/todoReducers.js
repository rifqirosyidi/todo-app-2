import * as TYPE from "./todoTypes";
import shortid from "shortid";

const initState = {
  loading: false,
  todos: [],
  error: "",
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPE.FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.FETCH_TODOS_SUCCESS:
      return {
        loading: false,
        todos: action.payload,
        error: "",
      };

    case TYPE.FETCH_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    // ADD TODO
    case TYPE.ADD_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.ADD_TODOS_SUCCESS:
      return {
        loading: false,
        todos: [
          ...state.todos,
          { id: action.payload.id, todo: action.payload.todo, complete: 0 },
        ],
        error: "",
      };

    case TYPE.ADD_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    // DELETE TODO
    case TYPE.DELETE_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.DELETE_TODOS_SUCCESS:
      console.log(state.todos);
      return {
        loading: false,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        error: "",
      };

    case TYPE.DELETE_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    // TOGGLE TODO
    case TYPE.TOGGLE_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.TOGGLE_TODOS_SUCCESS:
      state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.complete = !todo.complete ? 1 : 0;
          return todo;
        }
      });
      return {
        loading: false,
        todos: [...state.todos],
        error: "",
      };

    case TYPE.TOGGLE_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    // UPDATE TODO
    case TYPE.UPDATE_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPE.UPDATE_TODOS_SUCCESS:
      console.log(action.payload.updatedVal);
      return {
        loading: false,
        todos: [...state.todos],
        error: "",
      };

    case TYPE.UPDATE_TODOS_FAILURE:
      return {
        loading: false,
        todos: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default todoReducer;
