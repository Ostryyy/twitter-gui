import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import MainNavigation from "../../components/MainNavigation";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainNavigation user={user} />
      <Outlet />
    </Box>
  );
};

export default HomePage;
