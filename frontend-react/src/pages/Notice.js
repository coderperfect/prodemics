import { Button, Container, Grid } from "@mui/material";
import {useEffect, useState} from "react";
import NoticeSummary from "../components/notice/NoticeSummary";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch("https://prodemics.herokuapp.com/notice/list", 
    {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    }
    ).then(response => {
      response.json().then(responseBody => {
        setNotices(responseBody);
      })
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={2} sx={{textAlign: "center"}}>
        <Grid item xs={6}>
          <h1>Notices</h1>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "2rem" }}>
          <Button variant="contained">Add Notice</Button>
        </Grid>
          {notices.map(notice => <NoticeSummary notice={notice}/>)}
      </Grid>
    </Container>
  );
};

export default Notice;
