import React from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <div className="mt-4">
      <TodoForm />
      <Todo />
    </div>
  );
}

export default App;
