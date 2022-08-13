import { Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoticeDetails = () => {
  const [notice, setNotice] = useState({id: 0, title: '', description: '', createdAt: ''});

  const params = useParams();

  useEffect(() => {
    fetch("https://prodemics.herokuapp.com/notice/list", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((response) => {
      response.json().then((responseBody) => {
        const notice = responseBody.find((notice) => notice.id === +params.id);
        if(!!notice)
            setNotice(notice);
      });
    });
  }, [params]);

  return (
    <Container sx={{marginTop: "2rem", display: "flex", justifyContent: "center"}}>
      <Card sx={{width: "50%", minHeight: "25rem"}}>
        <CardContent>
          <Typography variant="h5" component="div">
            {notice.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {notice.createdAt}
          </Typography>
          <Typography variant="body2">{notice.description}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NoticeDetails;
