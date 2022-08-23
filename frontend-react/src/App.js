import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Notice from "./pages/Notice";
import Login from "./pages/Login";
import { decodeToken, isTokenValid } from "./util/token";
import AuthContext from "./store/auth-context";
import { CircularProgress } from "@mui/material";
import NoticeDetails from "./components/notice/NoticeDetails";
import NoticeAdd from "./components/notice/NoticeAdd";
import { usernameActions } from "./store/username-slice";
import { fetchAuthorities } from "./store/authorities-actions";
import Signup from "./pages/Signup";

function App() {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const authorities = useSelector((state) => state.authorities.authorities);

  useEffect(() => {
    setIsLoading(false);

    const token = localStorage.getItem("token");

    if (!authContext.user.username && token !== null && isTokenValid(token)) {
      const decodedToken = decodeToken(token);
      const user = {
        username: decodedToken.username,
        authorities: decodedToken.authorities,
      };

      authContext.setUser(user);
      dispatch(usernameActions.setUsername(user.username));
    }

    if (!authorities) {
      dispatch(fetchAuthorities());
    }

    setIsLoading(false);
  }, [authContext, authorities, dispatch]);

  return (
    <Layout>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <Routes>
          <Route
            path="/"
            element={
              !!authContext.user.username ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/notice"
            element={
              !!authContext.user.username ? (
                <Notice />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notice/:id"
            element={
              !!authContext.user.username ? (
                <NoticeDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notice/add"
            element={
              !!authContext.user.username ? (
                <NoticeAdd />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !authContext.user.username ? <Login /> : <Navigate to="/" />
            }
          />
          <Route
            path="/signup"
            element={
              !!authContext.user.username &&
              authContext.user.authorities.includes("admin") ? (
                <Signup />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      )}
    </Layout>
  );
}

export default App;
