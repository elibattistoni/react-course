import { createSlice } from "@reduxjs/toolkit";

//% 1) CREATING THE REDUCER (for the authentication)
const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

//% 3) EXPORTING ACTIONS IN ORDER TO ACCESS THEM
export const authActions = authSlice.actions;

export default authSlice.reducer;
