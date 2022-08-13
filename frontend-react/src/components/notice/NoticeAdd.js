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

  const [titleInput, setTitleInput] = useState("");
  const [createdAtInput, setCreatedAtInput] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [descriptionInput, setDescriptionInput] = useState("");

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

    const enteredTitle = titleInput;
    const enteredCreatedAt = createdAtInput;
    const enteredDescription = descriptionInput;

    const notice = {
      title: enteredTitle,
      createdAt: enteredCreatedAt,
      description: enteredDescription,
    };

    fetch("https://prodemics.herokuapp.com/admin/notice/add", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(notice),
    }).then((response) => {
      response.json().then((responseBody) => {
        if (!!responseBody) {
          setAdded(true);
          setTitleInput("");
          setCreatedAtInput(new Date().toISOString().split("T")[0]);
          setDescriptionInput("");
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
              />
            </FormControl>
            {isAdding && (
              <Button type="submit" variant="contained" disabled>
                <CircularProgress
                  size={15}
                  color="inherit"
                  sx={{ marginRight: "0.5rem" }}
                />{" "}
                Adding
              </Button>
            )}
            {!isAdding && (
              <Button type="submit" variant="contained">
                Add
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
      {isAdded && 
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
      }
    </Container>
  );
};

export default NoticeAdd;
