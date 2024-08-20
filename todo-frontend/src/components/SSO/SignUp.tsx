import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { userIdPatternValidation } from "../../utils/validations";
import { useSignUpMutation } from "../../lib/service/ssoService";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signUp, { isSuccess }] = useSignUpMutation();
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
      } else {
        return { ...pre };
      }
    });
  }

  function handleSubmit(): void {
    signUp({
      username: data?.userId || "",
      password: data?.password || "",
    }).then((res) => {
      if (res?.error) {
        const errorRes: { message: string[] | string } = {
          message: [],
          ...res?.error,
        };
        setOpen(true);
        setMessage(
          Array.isArray(errorRes?.message)
            ? errorRes?.message?.join(",")
            : errorRes?.message
        );
      } else {
        navigate("/sso");
      }
    });
  }

  return (
    <Box p={2}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
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
        {/* <TextField
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
        /> */}
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
            data?.userId === "" || data?.password === "" || error?.userId
          }
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;
