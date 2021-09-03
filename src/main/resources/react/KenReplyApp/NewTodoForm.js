import React, { useState, useEffect } from "react";
import { classnames } from "tailwindcss-classnames";

export const NewTodoForm = ({ addTodo }) => {
  const [newTodoTitleVal, setNewTodoTitleVal] = useState("");

  const btnAddClicked = () => {
    addTodo(newTodoTitleVal);

    setNewTodoTitleVal("");
    setTodosLastId(id);
  };

  return (
    <div className="flex">
      <input
        value={newTodoTitleVal}
        onChange={(e) => setNewTodoTitleVal(e.target.value)}
        type="text"
        className="p-[10px] rounded input input-bordered"
        placeholder="할일을 입력해주세요."
      />
      <button
        onClick={btnAddClicked}
        type="button"
        className="ml-3 btn btn-primary"
      >
        추가
      </button>
    </div>
  );
};
