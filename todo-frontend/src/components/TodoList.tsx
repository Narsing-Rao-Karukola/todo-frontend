import { Box, Card, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { todoListSelector } from "../lib/service/selectors";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoStatusMutation,
  useUpdateTodoTitleMutation,
} from "../lib/service/todoService";
import { Todo } from "./Todo";
import AddIcon from "@mui/icons-material/Add";
import { TodoType } from "../utils/types";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export function TodoList() {
  const { refetch } = useGetTodosQuery({});
  const [createTodo] = useCreateTodoMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [updateTodoTitle] = useUpdateTodoTitleMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const todoList = useSelector(todoListSelector);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);
  const [editMode, setEditModeTodo] = useState(false);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewTodo(event.target.value);
  };
  function addTodo(): void {
    createTodo({ completed: false, title: newTodo }).then((res) => {
      setNewTodo("");
      refetch();
    });
  }

  function updateTitle(): void {
    updateTodoTitle({ id: editTodoId, title: newTodo }).then((res) => {
      setNewTodo("");
      setEditModeTodo(false);
      refetch();
    });
  }

  function updateSpecificTodo(data: TodoType) {
    setNewTodo(data?.title);
    setEditModeTodo(true);
    setEditTodoId(data?.id);
  }

  function deleteSpecificId(id: number) {
    deleteTodo({ id: id }).then((res) => {
      refetch();
    });
  }

  function updateStatus(data: TodoType): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    updateTodoStatus({ ...data, completed: !data?.completed }).then((res) => {
      setNewTodo("");
      refetch();
    });
  }

  return (
    <Box mt={2} mx={10}>
      <Typography variant="h4">{"Your Todo-List"}</Typography>

      <Box>
        <Box>
          <TextField
            value={newTodo}
            onChange={handleInputChange}
            label="Add a new todo"
            sx={{ width: "50%", marginBottom: 3, marginRight: 4 }}
          />
          {!editMode ? (
            newTodo !== "" && (
              <IconButton onClick={addTodo}>
                <AddIcon />
              </IconButton>
            )
          ) : (
            <IconButton onClick={updateTitle}>
              <CheckOutlinedIcon />
            </IconButton>
          )}
        </Box>

        {todoList && todoList?.length > 0 ? (
          <Box
            height={"400px"}
            sx={{
              overflowY: "scroll",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {todoList?.map((todo, index) => (
              <Card
                key={index}
                sx={{
                  width: "80%",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  border: "1px solid light-gray",
                  my: 1,
                }}
              >
                <Todo
                  data={todo}
                  updateHandler={updateSpecificTodo}
                  deleteHandler={deleteSpecificId}
                  updateTodoStatus={updateStatus}
                />
              </Card>
            ))}
          </Box>
        ) : (
          <Typography>{"No Todo's found."}</Typography>
        )}
      </Box>
    </Box>
  );
}
