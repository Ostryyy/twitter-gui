import React from "react";
import { Box, CssBaseline } from "@mui/material";
import MainNavigation from "../components/MainNavigation";
import { useAuth } from "../AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
       <MainNavigation user={user} />
    </Box>
  );
};

export default HomePage;
