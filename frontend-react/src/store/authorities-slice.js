import { createSlice } from "@reduxjs/toolkit";

const authoritiesInitialState = {
  authorities: "",
};

const authoritiesSlice = createSlice({
  name: "authorities",
  initialState: authoritiesInitialState,
  reducers: {
    setAuthorities(state, action) {
      state.authorities = action.payload;
    },
  },
});

export const authoritiesActions = authoritiesSlice.actions;

export default authoritiesSlice.reducer;
