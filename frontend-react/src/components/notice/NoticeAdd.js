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
import { useState } from "react";

const NoticeAdd = () => {
  const [isAdding, setAdding] = useState(false);
  const [isAdded, setAdded] = useState(false);
  const [isError, setError] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [createdAtInput, setCreatedAtInput] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [descriptionInput, setDescriptionInput] = useState("");

  const [titleInputTouched, setTitleInputTouched] = useState(false);
  const [descriptionInputTouched, setDescriptionInputTouched] = useState(false);

  const onChangeHandler = (event) => {
    switch (event.target.id) {
      case "title":
        setTitleInput(event.target.value);
        break;
      case "createdAt":
        setCreatedAtInput(event.target.value);
        break;
      case "description":
        setDescriptionInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const noticeAddHandler = (event) => {
    event.preventDefault();

    setAdding(true);
    setAdded(false);
    setError(false);

    const enteredTitle = titleInput;
    const enteredCreatedAt = createdAtInput;
    const enteredDescription = descriptionInput;

    const notice = {
      title: enteredTitle,
      createdAt: enteredCreatedAt,
      description: enteredDescription,
    };

    fetch(`${process.env.REACT_APP_HOST_URL}/admin/notice/add`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notice),
    }).then((response) => {
      if (!response.ok) {
        setError(true);
        setAdding(false);
        return;
      }
      response.json().then((responseBody) => {
        if (!!responseBody) {
          setAdded(true);
          setTitleInput("");
          setCreatedAtInput(new Date().toISOString().split("T")[0]);
          setDescriptionInput("");
          setTitleInputTouched(false);
          setDescriptionInputTouched(false);
        }
        setAdding(false);
      });
    });
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
                value={titleInput}
                label="Title"
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={() => !titleInputTouched && setTitleInputTouched(true)}
                error={titleInputTouched && !titleInput}
                helperText={(titleInputTouched && !titleInput) ? 'Please enter title' : null}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="createdAt"
                type="date"
                value={createdAtInput}
                label="Date"
                variant="outlined"
                onChange={onChangeHandler}
                error={!createdAtInput}
                helperText={!createdAtInput ? 'Please enter/select date' : null}
              />
            </FormControl>
            <FormControl sx={{ marginBottom: "1rem", width: "90%" }}>
              <TextField
                id="description"
                type="text"
                multiline
                rows={10}
                value={descriptionInput}
                label="Description"
                variant="outlined"
                onChange={onChangeHandler}
                onBlur={() =>
                  !descriptionInputTouched && setDescriptionInputTouched(true)
                }
                error={descriptionInputTouched && !descriptionInput}
                helperText={(descriptionInputTouched && !descriptionInput) ? 'Please enter description' : null}
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
                disabled={!titleInput || !createdAtInput || !descriptionInput}
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
      {isError && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
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
