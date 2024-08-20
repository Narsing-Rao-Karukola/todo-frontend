import { Checkbox, IconButton, Stack, Typography } from "@mui/material";
import { TodoType } from "../../utils/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
export function Todo(props: {
  data: TodoType;
  updateHandler: (data: TodoType) => void;
  deleteHandler: (id: number) => void;
  updateTodoStatus: (data: TodoType) => void;
}) {
  const { data } = props;
  return (
    <>
      <Stack direction={"row"} alignItems={"center"}>
        <Checkbox
          onClick={() => props?.updateTodoStatus(data)}
          checked={data.completed}
        />
        <Typography
          sx={{ textDecoration: `${data.completed ? "line-through" : ""}` }}
        >
          {data.title}
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        {!data.completed && (
          <IconButton onClick={() => props?.updateHandler(data)}>
            <EditOutlinedIcon />
          </IconButton>
        )}
        <IconButton onClick={() => props?.deleteHandler(data.id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </>
  );
}
