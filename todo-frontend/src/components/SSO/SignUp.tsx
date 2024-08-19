import { Box, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { userIdPatternValidation } from "../../utils/validations";

function SignUp() {
  const [data, setData] = useState<{
    userId?: string;
    userName?: string;
    password?: string;
  }>({
    userId: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState<{
    userId?: boolean;
    userName?: boolean;
    password?: boolean;
  }>({
    userId: false,
    userName: false,
    password: false,
  });

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setData((pre) => ({
      ...pre,
      [event?.target.id]: event?.target.value,
    }));
    setError((pre) => {
      if (event?.target.id === "userId") {
        return {
          ...pre,
          [event?.target.id]: userIdPatternValidation(event?.target?.value),
        };
      } else if (event?.target.id === "userName") {
        return {
          [event?.target.id]: userIdPatternValidation(event?.target?.value),
        };
      } else {
        return { ...pre };
      }
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log("hey");
    // throw new Error("Function not implemented.");
  }
  return (
    <Box p={2}>
      <Typography variant="h4">Sign Up</Typography>
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
          id="userName"
          label="User Name"
          variant="outlined"
          value={data?.userName}
          onChange={handleChange}
          error={error.userName}
          helperText={
            error.userName
              ? "Invalid User Name (Only letters, numbers without spaces)"
              : ""
          }
        />
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
            data?.userName === "" || data?.password === "" || error?.userName
          }
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;
