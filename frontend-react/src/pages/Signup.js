import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import useHttp from "../hooks/use-http";

const Signup = () => {
  const { isSending: isSigningUp, isDone, setDone, error, sendRequest } = useHttp();

  const [usernameInput, setUsernameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [confirmEmailInput, setConfirmEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [usernameInputTouched, setUsernameInputTouched] = useState(false);
  const [nameInputTouched, setNameInputTouched] = useState(false);
  const [emailInputTouched, setEmailInputTouched] = useState(false);
  const [passwordInputTouched, setPasswordInputTouched] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const onChangeHandler = (event) => {
    switch (event.target.id) {
      case "username":
        setUsernameInput(event.target.value);
        break;
      case "name":
        setNameInput(event.target.value);
        break;
      case "email":
        setEmailInput(event.target.value);
        break;
      case "confirmEmail":
        setConfirmEmailInput(event.target.value);
        break;
      case "password":
        setPasswordInput(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPasswordInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredUsername = usernameInput;
    const enteredName = nameInput;
    const enteredEmail = emailInput;
    const enteredConfirmEmail = confirmEmailInput;
    const enteredPassword = passwordInput;
    const enteredConfirmPassword = confirmPasswordInput;

    await sendRequest(
      {
        url: `${process.env.REACT_APP_HOST_URL}/admin/user/signup`,
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: {
          username: enteredUsername,
          name: enteredName,
          emailId: enteredEmail,
          confirmEmailId: enteredConfirmEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword
        },
      },
      (responseBody) => {
        if(responseBody.username) {
          setUsernameInput("");
          setNameInput("");
          setEmailInput("");
          setConfirmEmailInput("");
          setPasswordInput("");
          setConfirmPasswordInput("");
          setUsernameInputTouched(false);
          setNameInputTouched(false);
          setEmailInputTouched(false);
          setPasswordInputTouched(false);
        }
      }
    );
  };

  useEffect(() => {
    const usernameValid = !usernameInputTouched || usernameInput;
    const nameValid = !nameInputTouched || nameInput;
    const emailValid = !emailInputTouched || emailInput;
    const confirmEmailValid = confirmEmailInput === emailInput;
    const passwordValid = !passwordInputTouched || passwordInput;
    const confirmPasswordValid = confirmPasswordInput === passwordInput;

    const formValid =
      usernameValid &&
      nameValid &&
      emailValid &&
      confirmEmailValid &&
      passwordValid &&
      confirmPasswordValid;

    setFormValid(formValid);
  }, [
    usernameInput,
    nameInput,
    emailInput,
    confirmEmailInput,
    passwordInput,
    confirmPasswordInput,
    usernameInputTouched,
    nameInputTouched,
    emailInputTouched,
    passwordInputTouched
  ]);

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item lg={4} xs={12}>
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
                {error.includes("Username") ? error : "Something went wrong"}
              </Alert>
            )}
            <h1>Signup</h1>
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
                id="name"
                type="text"
                label="Name"
                variant="outlined"
                value={nameInput}
                onChange={onChangeHandler}
                onBlur={() => !nameInputTouched && setNameInputTouched(true)}
                error={nameInputTouched && !nameInput}
                helperText={
                  nameInputTouched && !nameInput ? "Please enter Name" : null
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                value={emailInput}
                onChange={onChangeHandler}
                onBlur={() => !emailInputTouched && setEmailInputTouched(true)}
                error={emailInputTouched && !emailInput}
                helperText={
                  emailInputTouched && !emailInput ? "Please enter Email" : null
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="confirmEmail"
                type="email"
                label="Confirm Email"
                variant="outlined"
                value={confirmEmailInput}
                onChange={onChangeHandler}
                error={confirmEmailInput !== emailInput}
                helperText={
                  confirmEmailInput !== emailInput ? "Emails don't match" : null
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
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                value={confirmPasswordInput}
                onChange={onChangeHandler}
                error={confirmPasswordInput !== passwordInput}
                helperText={
                  confirmPasswordInput !== passwordInput
                    ? "Passwords don't match"
                    : null
                }
              />
            </FormControl>
            {isSigningUp && (
              <Button type="submit" variant="contained" disabled>
                <CircularProgress
                  size={15}
                  color="inherit"
                  sx={{ marginRight: "0.5rem" }}
                />{" "}
                Signing Up
              </Button>
            )}
            {!isSigningUp && (
              <Button
                type="submit"
                variant="contained"
                disabled={!formValid}
              >
                Signup
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      {isDone && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setDone(false)}
        >
          <Alert
            onClose={() => setDone(false)}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Signup successful
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Signup;
