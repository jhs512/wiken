import React, { useState, useEffect } from "react";
import { TodoListItem } from "./TodoListItem";

export const TodoList = ({ todos, deleteTodo, modifyTodo }) => {
  return (
    <div className="mt-2">
      <ul>
        {todos.map((todo) => (
          <TodoListItem
            todo={todo}
            deleteTodo={deleteTodo}
            modifyTodo={modifyTodo}
          />
        ))}
      </ul>
    </div>
  );
};
