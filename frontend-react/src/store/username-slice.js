import { createSlice } from "@reduxjs/toolkit";

const usernameInitialState = {
  username: "",
};

const usernameSlice = createSlice({
  name: "username",
  initialState: usernameInitialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const usernameActions = usernameSlice.actions;

export default usernameSlice.reducer;
