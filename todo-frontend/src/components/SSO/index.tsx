import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userIdPatternValidation } from "../../utils/validations";

export default function Sso() {
  const navigate = useNavigate();

  const [data, setData] = useState<{
    userId?: string;
    password?: string;
  }>({
    userId: "",
    password: "",
  });
  const [error, setError] = useState<{
    userId?: boolean;
    password?: boolean;
  }>({
    userId: false,
    password: false,
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setData((pre) => ({
      ...pre,
      [event?.target.id]: event?.target.value,
    }));
    if (event?.target.id === "userId") {
      setError((pre) => ({
        ...pre,
        [event?.target.id]: userIdPatternValidation(event?.target?.value),
      }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log("hey");
    // throw new Error("Function not implemented.");
  }

  return (
    <Box p={2}>
      <Typography variant="h4">Login</Typography>
      <Box
        component="form"
        p={2}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="userId"
          label="User Id"
          variant="outlined"
          value={data?.userId}
          onChange={handleChange}
          error={error.userId}
          helperText={
            error.userId
              ? "Invalid User Id (Only letters, numbers without spaces)"
              : ""
          }
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          value={data?.password}
          onChange={handleChange}
          error={error.password}
          required
        />

        <Button
          type="submit"
          variant="contained"
          disabled={
            data?.userId === "" || data?.password === "" || error?.userId
          }
        >
          Login
        </Button>
      </Box>
      <hr></hr>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/sso/sign-up");
        }}
      >{`Sign Up (New User)`}</Button>
    </Box>
  );
}
