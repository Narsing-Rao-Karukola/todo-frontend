import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/sso");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do Application
          </Typography>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
