import { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { Buffer } from "buffer";
import AuthContext from "../store/auth-context";
import { decodeToken } from "../util/token";
import useHttp from "../hooks/use-http";
import { InfoOutlined } from "@mui/icons-material";

const Login = () => {
  const authContext = useContext(AuthContext);

  const { isSending: isLoggingIn, error, sendRequest } = useHttp();

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInputTouched, setUsernameInputTouched] = useState(false);
  const [passwordInputTouched, setPasswordInputTouched] = useState(false);

  const onChangeHandler = (event) => {
    switch (event.target.id) {
      case "username":
        setUsernameInput(event.target.value);
        break;
      case "password":
        setPasswordInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInput;
    const eneteredPassword = passwordInput;

    await sendRequest(
      {
        url: `${process.env.REACT_APP_HOST_URL}/login`,
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${enteredUsername}:${eneteredPassword}`,
              "utf-8"
            ).toString("base64"),
        },
      },
      (responseBody) => {
        localStorage.setItem("token", responseBody.token);
        const decodedToken = decodeToken(responseBody.token);
        const user = {
          username: decodedToken.username,
          authorities: decodedToken.authorities,
        };

        authContext.setUser(user);
      }
    );
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={8} lg={4}>
          <Box
            component="form"
            sx={{ textAlign: "center" }}
            onSubmit={loginHandler}
          >
            {error && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: "1rem",
                  marginLeft: "1.1rem",
                  width: "82%",
                }}
              >
                Username/Password is incorrect
              </Alert>
            )}
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="username"
                type="text"
                label="Username"
                variant="outlined"
                value={usernameInput}
                onChange={onChangeHandler}
                onBlur={() =>
                  !usernameInputTouched && setUsernameInputTouched(true)
                }
                error={usernameInputTouched && !usernameInput}
                helperText={
                  usernameInputTouched && !usernameInput
                    ? "Please enter username"
                    : null
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                value={passwordInput}
                onChange={onChangeHandler}
                onBlur={() =>
                  !passwordInputTouched && setPasswordInputTouched(true)
                }
                error={passwordInputTouched && !passwordInput}
                helperText={
                  passwordInputTouched && !passwordInput
                    ? "Please enter password"
                    : null
                }
              />
            </FormControl>
            {isLoggingIn && (
              <Button type="submit" variant="contained" disabled>
                <CircularProgress
                  size={15}
                  color="inherit"
                  sx={{ marginRight: "0.5rem" }}
                />{" "}
                Loging In
              </Button>
            )}
            {!isLoggingIn && (
              <Button
                type="submit"
                variant="contained"
                disabled={!usernameInput || !passwordInput}
              >
                Login
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} sx={{ textAlign: "center", mt: "2rem" }}>
          <Tooltip title="Username: begula, Password: abc">
            <Chip
              icon={<InfoOutlined />}
              label="Read only user"
              variant="outlined"
            />
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
