import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLocalValue, LOCAL_KEYS } from "../utils/reduxStorage";

export function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: "auto",
      }}
    >
      <img
        src="todo-home.png"
        alt="todo-home"
        onClick={() => {
          navigate(
            getLocalValue(LOCAL_KEYS.ACCESS_TOKEN) ? "/todo-list" : "/sso"
          );
        }}
      />
    </Box>
  );
}
