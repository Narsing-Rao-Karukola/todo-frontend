import { Button, Checkbox, Typography } from "@mui/material";
import { TodoType } from "../../utils/types";

export function Todo(props: {
  data: TodoType;
  updateHandler: any;
  deleteHandler: (id:number) => void;
}) {
  const { data } = props;

  function handleDone(): void {}

  return (
    <>
      <Checkbox onClick={() => handleDone()} checked={data.completed}  />
      <Typography>{data.title}</Typography>
      {/* <Button
                  onClick={() => handleEdit(todo.id)}
                  variant="contained"
                  className={classes.listButtons}
                >
                  Edit
                </Button> */}
      <Button
        onClick={() => props?.deleteHandler(data.id)}
        color="secondary"
        variant="contained"
      >
        delete
      </Button>
    </>
  );
}
