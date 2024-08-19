import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LOCAL_KEYS, emptyCache, getLocalValue } from "../utils/reduxStorage";

function NavBar() {
  const navigate = useNavigate();
  const accessToken = getLocalValue(LOCAL_KEYS.ACCESS_TOKEN);
  function handleClick() {
    if (accessToken) {
      emptyCache();
    }
    navigate("/sso");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do Application
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            {accessToken ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
