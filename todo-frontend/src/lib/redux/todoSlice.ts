import { createSlice } from "@reduxjs/toolkit";
import { todoService } from "../service/todoService";
import { TodoType } from "../../utils/types";

type todoSliceType = {
  todoList?: TodoType[];
};

const initialState: todoSliceType = {
  todoList: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      todoService?.endpoints?.getTodos.matchFulfilled,
      (state, action) => {
        state.todoList = action.payload
      }
    );
  },
});

export default todoSlice.reducer;
