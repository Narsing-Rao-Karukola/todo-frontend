import {
  Box,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { todoListSelector } from "../lib/service/selectors";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../lib/service/todoService";
import { Todo } from "./Todo";
import AddIcon from "@mui/icons-material/Add";

export function TodoList() {
  const { data, isError, error, refetch } = useGetTodosQuery({});
  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const todoList = useSelector(todoListSelector);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewTodo(event.target.value);
  };
  function addTodo(): void {
    // console.log("newTodo", newTodo, todoList);
    createTodo({ completed: false, title: newTodo }).then((res) => {
      setNewTodo("");
      refetch();
    });
  }

  function deleteSpecificId(id: number) {
    deleteTodo({ id: id }).then((res) => {
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
          <IconButton onClick={addTodo}>
            <AddIcon />
          </IconButton>
          {/* <Button
           
            variant="contained"
            sx={{ marginBottom: 3 }}
          >
            Add
          </Button> */}
        </Box>
        {/* {todoList?.map((todo, index) => (
          <Stack key={index}  direction={"row"} justifyContent={"center"} alignItems={"center"} gap={4}>
            <Todo
              data={todo}
              updateHandler={undefined}
              deleteHandler={deleteSpecificId}
            />
          </Stack>
        ))} */}
        <List>
          {todoList?.map((todo, index) => (
            <ListItem
              key={index}
              sx={{
                width: "80%",
                margin: "auto",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid light-gray",
              }}
            >
              <Todo
                data={todo}
                updateHandler={undefined}
                deleteHandler={deleteSpecificId}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

//  default TodoList;
