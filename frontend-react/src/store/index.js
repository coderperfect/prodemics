import { configureStore } from "@reduxjs/toolkit";

import usernameSlice from "./username-slice";
import authoritiesSlice from "./authorities-slice";

const store = configureStore({
  reducer: { username: usernameSlice, authorities: authoritiesSlice },
});

export default store;
