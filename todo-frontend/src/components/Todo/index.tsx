import React, { useState } from "react";

export function Todo() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([
    {
      id: 1,
      text: "Doctor Appointment",
      completed: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      completed: false,
    },
  ]);
  const [text, setText] = useState("");

  function addTodo(todo: string) {
    setTasks((pre) => [
      ...pre,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return <div>Todo</div>;
}
