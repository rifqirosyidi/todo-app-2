import React, { useState } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { addTodo } from "../redux/todos/todoActions";

function TodoForm(props) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = shortid.generate();
    props.addTodo(id, todo);
    setTodo("");
  };

  return (
    <div className="container mx-auto" style={{ width: "500px" }}>
      {" "}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-6/12 pl-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Add Todo
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Enter a todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="w-full md:w-2/12 px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              ...
            </label>
            <button
              type="submit"
              style={{ height: "46px" }}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700"
            >
              Add
            </button>
          </div>
          <div className="w-full md:w-4/12 pr-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Status
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>All</option>
                <option>Not Completed</option>
                <option>Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (id, todo) => dispatch(addTodo(id, todo)),
  };
};

export default connect(null, mapDispatchToProps)(TodoForm);
