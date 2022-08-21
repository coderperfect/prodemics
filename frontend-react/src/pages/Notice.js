import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  PaginationItem,
} from "@mui/material";
import NoticeSummary from "../components/notice/NoticeSummary";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const Notice = () => {
  const authContext = useContext(AuthContext);

  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const { sendRequest, isSending } = useHttp();

  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const pageNumber = +searchParam.get("pageNumber") || 1;

  useEffect(() => {
    sendRequest(
      {
        url: `${
          process.env.REACT_APP_HOST_URL
        }/notice/list?${new URLSearchParams({ pageNumber: pageNumber })}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
      (responseBody) => {
        setNotices(responseBody.notices);
        setTotalPages(responseBody.totalPages);
      }
    );
  }, [sendRequest, pageNumber]);

  const noticeClickHandler = (id) => {
    navigate(`/notice/${id}`);
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid item xs={6}>
          <h1>Notices</h1>
        </Grid>
        <Grid item xs={6} sx={{ marginTop: "2rem" }}>
          {authContext.user.authorities.includes("admin") && (
            <Button variant="contained" onClick={() => navigate("/notice/add")}>
              Add Notice
            </Button>
          )}
        </Grid>
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          {isSending && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "left",
              }}
            >
              <CircularProgress />
            </Grid>
          )}
          {!isSending &&
            notices.map((notice) => (
              <NoticeSummary
                key={notice.id}
                notice={notice}
                onNoticeClick={noticeClickHandler}
              />
            ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", textAlign: "left" }}
        >
          <Pagination
            page={pageNumber}
            count={totalPages}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/notice?pageNumber=${item.page}`}
                {...item}
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Notice;
