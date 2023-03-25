import { useDispatch } from "react-redux";
import { removeTodoAsync, toggleTodoAsync } from "../../../features/todos/todosSlice";

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDestroy = (id) => {
    dispatch(removeTodoAsync(id));
    console.log(id);
  };
  const handleTodo = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }));
  };
  return (
    <li className={item.completed ? `completed` : ``}>
      <div className="view">
        <input
          onChange={() => handleTodo(item.id, !item.completed)}
          className="toggle"
          type="checkbox"
        />
        <label>{item.title}</label>
        <button
          onClick={() => handleDestroy(item.id)}
          className="destroy"
        ></button>
      </div>
    </li>
  );
};

export default TodoItem;
