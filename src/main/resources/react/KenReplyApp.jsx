import React, { useState, useEffect } from "react";
import { NewTodoForm } from "./KenReplyApp/NewTodoForm";
import { TodoList } from "./KenReplyApp/TodoList";
import { render } from "react-dom";

const KenReplyApp = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "제목1" },
    { id: 2, title: "제목2" },
  ]);

  const [todosLastId, setTodosLastId] = useState(todos.length);

  const addTodo = (title) => {
    const id = todosLastId + 1;
    const todo = {
      id,
      title,
    };
    setTodos([...todos, todo]);
    setTodosLastId(id);
  };

  const modifyTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id != id ? todo : { ...todo, title })));
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id != id));

  return (
    <div className="container mx-auto">
      <NewTodoForm addTodo={addTodo} />

      <TodoList todos={todos} modifyTodo={modifyTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

render(<KenReplyApp />, document.getElementById("KenReplyApp"));
