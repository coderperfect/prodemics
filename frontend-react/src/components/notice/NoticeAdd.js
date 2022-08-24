import { useReducer } from "react";
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
import useHttp from "../../hooks/use-http";

const titleReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "INPUT_BLUR") {
    if (!state.isTouched) return { value: state.value, isTouched: true };
    else return state;
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
};

const descriptionReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "INPUT_BLUR") {
    if (!state.isTouched) return { value: state.value, isTouched: true };
    else return state;
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
};

const createdAtReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value };
  }

  if (action.type === "RESET") {
    return { value: new Date().toISOString().split("T")[0] };
  }
};

const NoticeAdd = () => {
  const {
    isSending: isAdding,
    isDone: isAdded,
    setDone: setAdded,
    error,
    setError,
    sendRequest,
  } = useHttp();

  const [titleInput, titleInputDispatch] = useReducer(titleReducer, {
    value: "",
    isTouched: false,
  });
  const [createdAtInput, createdAtInputDispatch] = useReducer(
    createdAtReducer,
    { value: new Date().toISOString().split("T")[0] }
  );
  const [descriptionInput, descriptionInputDispatch] = useReducer(
    descriptionReducer,
    { value: "", isTouched: false }
  );

  const onChangeHandler = (event) => {
    switch (event.target.id) {
      case "title":
        titleInputDispatch({ type: "USER_INPUT", value: event.target.value });
        break;
      case "createdAt":
        createdAtInputDispatch({
          type: "USER_INPUT",
          value: event.target.value,
        });
        break;
      case "description":
        descriptionInputDispatch({
          type: "USER_INPUT",
          value: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  const noticeAddHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInput;
    const enteredCreatedAt = createdAtInput;
    const enteredDescription = descriptionInput;

    const notice = {
      title: enteredTitle.value,
      createdAt: enteredCreatedAt.value,
      description: enteredDescription.value,
    };

    await sendRequest(
      {
        url: `${process.env.REACT_APP_HOST_URL}/admin/notice/add`,
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: notice,
      },
      (responseBody) => {
        if (!!responseBody) {
          titleInputDispatch({ type: "RESET" });
          createdAtInputDispatch({ type: "RESET" });
          descriptionInputDispatch({ type: "RESET" });
        }
      }
    );
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={6}>
          <Box
            component="form"
            sx={{ textAlign: "center" }}
            onSubmit={noticeAddHandler}
          >
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="title"
                type="text"
                value={titleInput.value}
                label="Title"
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={() => titleInputDispatch({ type: "INPUT_BLUR" })}
                error={titleInput.isTouched && !titleInput.value}
                helperText={
                  titleInput.isTouched && !titleInput.value
                    ? "Please enter title"
                    : null
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="createdAt"
                type="date"
                value={createdAtInput.value}
                label="Date"
                variant="outlined"
                onChange={onChangeHandler}
                error={!createdAtInput.value}
                helperText={
                  !createdAtInput.value ? "Please enter/select date" : null
                }
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="description"
                type="text"
                multiline
                rows={10}
                value={descriptionInput.value}
                label="Description"
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={() => descriptionInputDispatch({ type: "INPUT_BLUR" })}
                error={descriptionInput.isTouched && !descriptionInput.value}
                helperText={
                  descriptionInput.isTouched && !descriptionInput.value
                    ? "Please enter description"
                    : null
                }
              />
            </FormControl>
            {isAdding && (
              <Button type="submit" variant="contained" disabled>
                <CircularProgress
                  size={15}
                  color="inherit"
                  sx={{ marginRight: "0.5rem" }}
                />
                Adding
              </Button>
            )}
            {!isAdding && (
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !titleInput.value ||
                  !createdAtInput.value ||
                  !descriptionInput.value
                }
              >
                Add
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      {isAdded && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setAdded(false)}
        >
          <Alert
            onClose={() => setAdded(false)}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Notice added successfully
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert
            onClose={() => setError(null)}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            Something went wrong
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default NoticeAdd;
