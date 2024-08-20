import { todoDtoType, TodoType } from "../../utils/types";
import { apiSlice } from "../redux/apiSlice";
import { createTodo, getAllTodos } from "./endpoints";

export const todoService = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query({
      query: (payload) => ({
        ...getAllTodos,
      }),
    }),
    createTodo: build.mutation<any, todoDtoType>({
      query: (payload) => ({
        ...createTodo,
        data: { ...payload },
      }),
    }),
    updateTodoStatus: build.mutation<any, TodoType>({
      query: ({ id, ...rest }) => ({
        method: "PATCH",
        url: `/tasks/${id}/status`,
        data: { ...rest },
      }),
    }),
    updateTodoTitle: build.mutation<any, {id:number, title:string}>({
      query: ({ id, ...rest }) => ({
        method: "PATCH",
        url: `/tasks/${id}/title`,
        data: { ...rest },
      }),
    }),
    deleteTodo: build.mutation<any, { id: number }>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/tasks/${id}`,
        data: { id: id },
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoStatusMutation,
  useUpdateTodoTitleMutation,
  useDeleteTodoMutation,
} = todoService;
