import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
