import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import NoticeSummary from "../components/notice/NoticeSummary";
import AuthContext from "../store/auth-context";

const Notice = () => {
  const authContext = useContext(AuthContext);

  const [notices, setNotices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_URL}/notice/list`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((responseBody) => {
        setNotices(responseBody);
      });
    });
  }, []);

  const noticeClickHandler = (id) => {
    navigate(`${id}`);
  }

  return (
    <Container>
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid item xs={6}>
          <h1>Notices</h1>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "2rem" }}>
          {authContext.user.authorities.includes("admin") && (
            <Button variant="contained" onClick={() => navigate("add")}>Add Notice</Button>
          )}
        </Grid>
        {notices.map((notice) => (
          <NoticeSummary key={notice.id} notice={notice} onNoticeClick={noticeClickHandler} />
        ))}
      </Grid>
    </Container>
  );
};

export default Notice;
