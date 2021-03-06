import * as TYPE from "./todoTypes";
import axios from "axios";

// Fetch Todo
export const fetchTodosRequest = () => {
  return {
    type: TYPE.FETCH_TODOS_REQUEST,
  };
};

export const fetchTodosSuccess = (todos) => {
  return {
    type: TYPE.FETCH_TODOS_SUCCESS,
    payload: todos,
  };
};

export const fetchTodosFailure = (error) => {
  return {
    type: TYPE.FETCH_TODOS_FAILURE,
    payload: error,
  };
};

export const fetchTodos = () => {
  return function (dispatch) {
    dispatch(fetchTodosRequest());
    axios
      .get("http://localhost:8000/api/todos")
      .then((response) => {
        const todos = response.data.data.map((todo) => todo);
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error) => {
        dispatch(fetchTodosFailure(error.message));
      });
  };
};

// Add Todo
export const addTodoRequest = () => {
  return {
    type: TYPE.ADD_TODOS_REQUEST,
  };
};

export const addTodoSuccess = (id, todo) => {
  return {
    type: TYPE.ADD_TODOS_SUCCESS,
    payload: { id: id, todo: todo },
  };
};

export const addTodoFailure = (error) => {
  return {
    type: TYPE.ADD_TODOS_FAILURE,
    payload: error,
  };
};

export const addTodo = (id, todo) => {
  return function (dispatch) {
    dispatch(addTodoRequest());
    axios
      .post("http://localhost:8000/api/todos", {
        id: id,
        todo: todo,
      })

      .then((response) => {
        console.log(response);
        dispatch(addTodoSuccess(id, todo));
      })

      .catch((error) => {
        dispatch(addTodoFailure(error.message));
      });
  };
};

// Delete Todo
export const deleteTodoRequest = () => {
  return {
    type: TYPE.DELETE_TODOS_REQUEST,
  };
};

export const deleteTodoSuccess = (id) => {
  return {
    type: TYPE.DELETE_TODOS_SUCCESS,
    payload: id,
  };
};

export const deleteTodoFailure = (error) => {
  return {
    type: TYPE.DELETE_TODOS_FAILURE,
    payload: error,
  };
};

export const deleteTodo = (id) => {
  console.log(id);
  return function (dispatch) {
    dispatch(deleteTodoRequest());
    axios
      .delete(`http://localhost:8000/api/todos/${id}`)

      .then((response) => {
        dispatch(deleteTodoSuccess(id));
      })

      .catch((error) => {
        dispatch(deleteTodoFailure(error.message));
      });
  };
};

// Toggle Todo
export const toggleTodoRequest = () => {
  return {
    type: TYPE.TOGGLE_TODOS_REQUEST,
  };
};

export const toggleTodoSuccess = (id, complete) => {
  return {
    type: TYPE.TOGGLE_TODOS_SUCCESS,
    payload: { id, complete },
  };
};

export const toggleTodoFailure = (error) => {
  return {
    type: TYPE.TOGGLE_TODOS_FAILURE,
    payload: error,
  };
};

export const toggleTodo = (id, complete) => {
  return function (dispatch) {
    dispatch(toggleTodoRequest());
    axios
      .put(`http://localhost:8000/api/todo/${id}/status`, {
        complete: complete ? 1 : 0,
      })

      .then((response) => {
        dispatch(toggleTodoSuccess(id, complete));
      })

      .catch((error) => {
        dispatch(toggleTodoFailure(error.message));
      });
  };
};

// Update Todo
export const updateTodoRequest = () => {
  return {
    type: TYPE.UPDATE_TODOS_REQUEST,
  };
};

export const updateTodoSuccess = (id, updatedVal) => {
  return {
    type: TYPE.UPDATE_TODOS_SUCCESS,
    payload: { id, updatedVal },
  };
};

export const updateTodoFailure = (error) => {
  return {
    type: TYPE.UPDATE_TODOS_FAILURE,
    payload: error,
  };
};

export const updateTodo = (id, updatedVal) => {
  return function (dispatch) {
    dispatch(updateTodoRequest());
    axios
      .put(`http://localhost:8000/api/todo/${id}/text`, {
        todo: updatedVal,
      })

      .then((response) => {
        dispatch(updateTodoSuccess(id, updatedVal));
      })

      .catch((error) => {
        dispatch(updateTodoFailure(error.message));
      });
  };
};
