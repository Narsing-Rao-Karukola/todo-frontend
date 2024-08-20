import { Button, Checkbox, Typography } from "@mui/material";
import { TodoType } from "../../utils/types";

export function Todo(props: {
  data: TodoType;
  updateHandler: (data: TodoType) => void;
  deleteHandler: (id: number) => void;
  updateTodoStatus: (data: TodoType) => void;
}) {
  const { data } = props;
  return (
    <>
      <Checkbox
        onClick={() => props?.updateTodoStatus(data)}
        checked={data.completed}
      />
      <Typography>{data.title}</Typography>
      <Button onClick={() => props?.updateHandler(data)} variant="contained">
        {"Edit"}
      </Button>
      <Button
        onClick={() => props?.deleteHandler(data.id)}
        color="secondary"
        variant="contained"
      >
        {"Delete"}
      </Button>
    </>
  );
}
