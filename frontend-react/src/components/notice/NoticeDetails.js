import { Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";

const NoticeDetails = () => {
  const [notice, setNotice] = useState({
    id: 0,
    title: "",
    description: "",
    createdAt: "",
  });
  const { sendRequest } = useHttp();

  const params = useParams();

  useEffect(() => {
    const toAwait = async () =>
      await sendRequest(
        {
          url: `${process.env.REACT_APP_HOST_URL}/notice/list`,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
        (responseBody) => {
          const notice = responseBody.notices.find(
            (notice) => notice.id === +params.id
          );
          if (!!notice) setNotice(notice);
        }
      );

    toAwait();
  }, [params, sendRequest]);

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
    >
      <Card sx={{ minHeight: "25rem" }}>
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
