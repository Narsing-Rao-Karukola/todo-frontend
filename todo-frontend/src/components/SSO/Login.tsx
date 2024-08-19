import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userIdPatternValidation } from "../../utils/validations";
import { useSignInMutation } from "../../lib/service/ssoService";

export default function Login() {
  const navigate = useNavigate();
  const [signIn, { isSuccess }] = useSignInMutation();

  if (isSuccess) {
    navigate("/todo-list");
  }

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
  function handleSubmit(): void {
    signIn({ username: data?.userId || "", password: data?.password || "" })
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }

  return (
    <Box p={2}>
      <Typography variant="h4">Login</Typography>
      <Box
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
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
          variant="contained"
          onClick={() => handleSubmit()}
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
