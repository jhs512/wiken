import React, { useState, useEffect } from "react";
import { TodoListItem } from "./TodoListItem";

export const TodoList = ({ todos, deleteTodo, modifyTodo }) => {
  return (
    <div className="mt-2">
      <ul>
        {todos.map((todo, index) => (
          <TodoListItem
            key={index}
            todo={todo}
            deleteTodo={deleteTodo}
            modifyTodo={modifyTodo}
          />
        ))}
      </ul>
    </div>
  );
};
