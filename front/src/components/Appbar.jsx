import MenuIcon from "@mui/icons-material/Menu";
import { Button, Grid, Popover, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { BiLogOut } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../constants/routes";

const drawerWidth = 240;

const Appbar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const firstName = localStorage.getItem("firstName");

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Todo App
      </Typography>
      <Divider />
      {/* code here */}
      <List></List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // popover

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate(LOGIN_ROUTE);
    queryClient.removeQueries();
  };

  return (
    <Box sx={{ display: "flex", mb: "5rem" }}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid sx={{ padding: "0 1rem 1rem 0" }}>
          <Typography sx={{ p: 2 }}>
            Are you sure you want to logout ?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleLogout();
                closePopover();
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={closePopover}>
              No
            </Button>
          </Stack>
        </Grid>
      </Popover>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: "#5C5470" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Todo App
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },

              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Typography>Welcome {firstName}</Typography>

            <BiLogOut
              size={25}
              style={{ color: "#fffff", cursor: "pointer" }}
              onClick={openPopover}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Appbar;
