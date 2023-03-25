import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem.js";
import {
  getTodosAsync,
  todosSelector,
  activeFilterSelector,
  loadingSelector,
  errorSelector,
} from "../../features/todos/todosSlice.js";
import Loading from "../Loading/index.js";
import Error from "../Error/index.js";
let filteredItem = [];
const TodoList = () => {
  const items = useSelector(todosSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const dispatch = useDispatch();
  useEffect(() => { 
    dispatch(getTodosAsync());
  }, [dispatch]);
  const activeFilter = useSelector(activeFilterSelector);
  filteredItem = items;
  if (activeFilter !== "all") {
    filteredItem = items.filter((item) =>
      activeFilter === "active"
        ? item.completed === false
        : item.completed === true
    );
  }
if(loading){
  return <Loading/>
}else if (error){
  return <Error error={error}/>
}
  return (
   
        <ul className="todo-list">
          {filteredItem.map((item) => (
            <TodoItem key={item.id} item={item} />
          ))}
        </ul>
      
  
  );
};

export default TodoList;
