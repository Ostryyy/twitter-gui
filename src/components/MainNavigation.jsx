import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Icon,
  Divider,
} from "@mui/material";
import {
  Home,
  Search,
  Person,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/features/auth/authSlice";

const drawerWidth = 340;

const MainNavigation = ({ user }) => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate("/login");
  };

  const navigationItems = [
    { text: "Home", icon: <Home /> },
    { text: "Browse", icon: <Search /> },
    { text: "Profile", icon: <Person /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 40,
            margin: 2,
          }}
          src={logo}
          alt="Logo"
        />
      </Toolbar>
      <List sx={{ flexGrow: 1 }}>
        {navigationItems.map((item) => (
          <ListItemButton key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      {user && (
        <List sx={{ width: "100%", position: "absolute", bottom: 0 }}>
          <ListItemButton
            sx={{ justifyContent: "space-between" }}
            onClick={handleUserMenuClick}
          >
            <ListItemIcon>
              <Avatar src={user.avatar} />
            </ListItemIcon>
            <ListItemText primary={user.username} secondary={user.email} />
            <Icon
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-user"
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </Icon>
          </ListItemButton>
        </List>
      )}
      <Menu
        anchorEl={userMenuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isUserMenuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Drawer>
  );
};

export default MainNavigation;
