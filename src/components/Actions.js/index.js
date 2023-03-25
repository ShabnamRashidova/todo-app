import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeFilterSelector,
  changeActiveFilter,
  clearCompleted,
  todosSelector,
} from "../../features/todos/todosSlice";

const Actions = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector(activeFilterSelector);
  const items = useSelector(todosSelector);
  let uncompleted = items.filter((item) => item.completed === false).length;
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>
          {uncompleted} item{uncompleted > 1 ? "s" : ""}{" "}
        </strong>
        left
      </span>
      <ul className="filters">
        <li onClick={() => dispatch(changeActiveFilter("all"))}>
          <span className={activeFilter === `all` ? `selected` : ``}>All</span>
        </li>
        <li onClick={() => dispatch(changeActiveFilter("active"))}>
          <span className={activeFilter === `active` ? `selected` : ``}>
            Active
          </span>
        </li>
        <li onClick={() => dispatch(changeActiveFilter("completed"))}>
          <span className={activeFilter === `completed` ? `selected` : ``}>
            Completed
          </span>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Actions;
