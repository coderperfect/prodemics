import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Notice from "./pages/Notice";
import Login from "./pages/Login";
import { decodeToken, isTokenValid } from "./util/token";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(!authContext.user.username && token !== null && isTokenValid(token)) {
      const decodedToken = decodeToken(token);
      const user = {
        username: decodedToken.username,
        authorities: decodedToken.authorities
      }

      authContext.setUser(user);
    }
  }, [authContext]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
