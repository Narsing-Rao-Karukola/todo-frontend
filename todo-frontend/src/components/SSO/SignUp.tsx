import { Box, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { userIdPatternValidation } from "../../utils/validations";
import { useSignUpMutation } from "../../lib/service/ssoService";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();
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

  function handleSubmit(): void {
    signUp({
      username: data?.userId || "",
      password: data?.password || "",
    }).then(() => {
      navigate("/sso/sign-up");
    });
  }

  return (
    <Box p={2}>
      <Typography variant="h4">Sign Up</Typography>
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
          onClick={() => handleSubmit()}
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
