import { createContext, useState } from "react";

const AuthContext = createContext({
  user: {
    username: "",
    authorities: "",
  },
  setUser: (user) => {console.log(user)},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({ username: "", authorities: "" });

  const setUserHandler = (user) => {
    setUser(user);
  }

  const context = {
    user: user,
    setUser: setUserHandler
  }

  return <AuthContext.Provider value={context}>{props.children}</AuthContext.Provider>;
}

export default AuthContext;
