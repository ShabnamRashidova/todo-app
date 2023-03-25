import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading";
import Error from "../../Error";
import {
  addTodoAsync,
} from "../../../features/todos/todosSlice";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const loading = useSelector(state=>state.todos.addNewTodoLoading);
  const error = useSelector(state=>state.todos.addNewTodoError);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await dispatch(addTodoAsync({title}));
    setTitle("");
  };
  if(loading){
    return <Loading/>
  }else if(error){
    return <Error error={error} />
  }
  return (
    
        <form onSubmit={handleSubmit}>
          <input disabled={loading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
  );
};

export default AddForm;
