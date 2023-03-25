import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodosAsync = createAsyncThunk("todos/getTodos", async () => {
  const res = await axios("http://localhost:7000/todos");
  return res.data;
});
export const addTodoAsync = createAsyncThunk("todos/addTodo", async (todo) => {
  const res = await axios.post("http://localhost:7000/todos", todo);
  return res.data;
});
export const removeTodoAsync = createAsyncThunk("todos/destroy", async (id) => {
  await axios.delete(`http://localhost:7000/todos/${id}`);
  return id;
});
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data);
    return res.data;
  }
);
const initialState = {
  items: [],
  loading: false,
  addNewTodoLoading: false,
  error: null,
  addNewTodoError: null,
  activeFilter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearCompleted: (state) => {
      const filterItem = state.items.filter((item) => !item.completed);
      state.items = filterItem;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: {
    //get todos
    [getTodosAsync.pending]: (state) => {
      state.loading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    //add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.addNewTodoLoading = false;

      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },
    //destroy
    [removeTodoAsync.fulfilled]: (state, action) => {
      state.loading = false;
      const id = action.payload;
      const destroyItem = state.items.filter((item) => item.id !== id);
      state.items = destroyItem;
    },
    //toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const toggleItem = state.items.find((item) => item.id === id);
      toggleItem.completed = completed;
    },
  },
});

export const todosSelector = (state) => state.todos.items;
export const loadingSelector = (state) => state.todos.loading;
export const errorSelector = (state) => state.todos.error;
export const activeFilterSelector = (state) => state.todos.activeFilter;
export default todosSlice.reducer;
export const { clearCompleted, changeActiveFilter } = todosSlice.actions;
