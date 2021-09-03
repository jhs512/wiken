import React, { useState, useEffect } from "react";
import { classnames } from "tailwindcss-classnames";

export const TodoListItem = ({ todo, deleteTodo, modifyTodo }) => {
  const [editStatus, setEditStatus] = useState(false);
  const [newTitleVal, setNewTitleVal] = useState(todo.title);

  const btnStartEditClicked = () => {
    setEditStatus(true);
  };

  const btnCancelEditClicked = () => {
    setNewTitleVal(todo.title);
    setEditStatus(false);
  };

  const btnCompleteEditClicked = () => {
    modifyTodo(todo.id, newTitleVal);
    setEditStatus(false);
  };

  const btnDeleteClicked = () => {
    deleteTodo(todo.id);
  };

  const editHighlightColor = "red";

  return (
    <li
      key={todo.id}
      className={classnames(
        "flex",
        "p-2",
        { [`bg-${editHighlightColor}-300`]: editStatus },
        { rounded: editStatus }
      )}
    >
      <span className="badge badge-primary">{todo.id}</span>
      {!editStatus ? (
        <>
          <span className="ml-2">{todo.title}</span>
          <button
            onClick={btnStartEditClicked}
            type="button"
            className="ml-2 btn btn-xs btn-secondary"
          >
            변경
          </button>
        </>
      ) : (
        <>
          <input
            className="input input-bordered input-xs"
            value={newTitleVal}
            onChange={(e) => setNewTitleVal(e.target.value)}
          />
          <button
            onClick={btnCancelEditClicked}
            type="button"
            className="ml-2 btn btn-xs btn-secondary"
          >
            변경취소
          </button>
          <button
            onClick={btnCompleteEditClicked}
            type="button"
            className="ml-2 btn btn-xs btn-primary"
          >
            변경완료
          </button>
        </>
      )}
      <button
        onClick={btnDeleteClicked}
        type="button"
        className="ml-2 btn btn-xs btn-primary"
      >
        삭제
      </button>
    </li>
  );
};
