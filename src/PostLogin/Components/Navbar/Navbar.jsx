import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Logout as LogoutIcon,
  Close,
} from "@mui/icons-material";
import FlexBetween from "../FlexBetween";
import { useDispatch } from "react-redux";
import { setMode, setIsSidebarOpen } from "../../../redux/reducers/globalReducer";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { logout } from "../../../redux/reducers/loginReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () =>{
    dispatch(logout());
    localStorage.removeItem('token');
  }

  return (
    <AppBar
      sx={{
        position: "sticky",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", backgroundColor: '#fff' }}>
        {/* LEFT SIDE */}
        <FlexBetween sx={{ flexGrow: 1 }}>
          <IconButton onClick={() => dispatch(setIsSidebarOpen())}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">


          <IconButton onClick={handleClick}>
            <LogoutIcon sx={{ fontSize: "25px" }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "0.5rem",
              }}
            >
              <Typography variant="body1"></Typography>
              <IconButton onClick={handleClose}>
                <Close sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
            <MenuItem sx={{
              backgroundColor: "red", margin: "5px",color:"white", borderRadius: "5px", "&:hover": {
                backgroundColor: "#D20000", 
                color: "#fff", 
              },
            }} onClick={handleLogout}>
              <Typography variant="body1" >Logout</Typography>
            </MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
