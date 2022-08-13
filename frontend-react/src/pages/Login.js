import { useContext, useRef } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { Buffer } from "buffer";
import AuthContext from "../store/auth-context";
import { decodeToken } from "../util/token";

const Login = () => {
  const authContext = useContext(AuthContext);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const eneteredPassword = passwordInputRef.current.value;

    fetch("https://prodemics.herokuapp.com/login", {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${enteredUsername}:${eneteredPassword}`,
            "utf-8"
          ).toString("base64"),
      },
    }).then((response) => {
      response.json().then((responseBody) => {
        localStorage.setItem("token", responseBody.token);
        const decodedToken = decodeToken(responseBody.token);
        const user = {
          username: decodedToken.username,
          authorities: decodedToken.authorities,
        };

        authContext.setUser(user);
      });
    });
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={4}>
          <Box
            component="form"
            sx={{ textAlign: "center" }}
            onSubmit={loginHandler}
          >
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="username"
                type="text"
                label="Username"
                variant="outlined"
                inputRef={usernameInputRef}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                inputRef={passwordInputRef}
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
