import { RootState } from "../redux/store";

export const todoListSelector = (state: RootState) => state?.todo?.todoList;