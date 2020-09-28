import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos, deleteTodo, toggleTodo } from "../redux/todos/todoActions";
import EditText from "react-editext";
import { Redirect } from "react-router-dom";

const Todo = ({ listTodos, fetchTodos, deleteTodo, toggleTodo }) => {
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSave = () => {
    console.log("Edited Value -> ");
    // EDIT SAVE
  };

  const handleToggleTodo = (id, complete) => {
    listTodos.map((todo) => {
      if (todo.id === id) {
        toggleTodo(todo.id, complete);
      }
    });
    return <Redirect to="/" />;
  };

  return (
    <div className="container mx-auto" style={{ width: "500px" }}>
      {listTodos.map((todo) => (
        <div
          key={todo.id}
          className="mx-auto text-center bg-teal-100 border-teal-500 text-teal-900 px-4 py-2 my-1"
        >
          <div className="flex">
            <div
              className="w-full md:w-4/6 px-3 md:mb-0"
              style={{
                textDecoration: todo.complete ? "line-through" : "",
              }}
            >
              <EditText
                submitOnEnter
                buttonsAlign="before"
                hideIcon="true"
                saveButtonContent={
                  <span className="iconify" data-icon="fa:check"></span>
                }
                editButtonContent={
                  <span className="iconify" data-icon="fa:pencil"></span>
                }
                cancelButtonContent={
                  <span className="iconify" data-icon="fa:times"></span>
                }
                editButtonClassName="bg-blue-500 mx-1 hover:bg-blue-700 text-white font-bold py-2 px-2"
                saveButtonClassName="bg-green-500 mx-1 hover:bg-green-700 text-white font-bold py-2 px-2"
                cancelButtonClassName="bg-red-500 mx-1 hover:bg-red-700 text-white font-bold py-2 px-2"
                type="text"
                value={todo.todo}
                onSave={handleSave}
              />
            </div>
            <div className="w-full md:w-2/6 px- md:mb-0">
              <button
                onClick={() => handleToggleTodo(todo.id, todo.complete)}
                className="bg-yellow-500 mx-1 hover:bg-yellow-700 text-white font-bold py-2 px-2 "
              >
                <span className="iconify" data-icon="fa:check"></span>
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 mx-1 hover:bg-red-700 text-white font-bold py-2 px-2 "
              >
                <span className="iconify" data-icon="fa:trash"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listTodos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => dispatch(fetchTodos()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    toggleTodo: (id, complete) => dispatch(toggleTodo(id, complete)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
