import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);
