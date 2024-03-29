import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AuthContext from "../store/auth-context";

const Home = () => {
  const authContext = React.useContext(AuthContext);

  const navigate = useNavigate();

  const noticeClickHandler = () => {
    navigate(`/notice?${new URLSearchParams({ pageNumber: 1 })}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={noticeClickHandler}
      >
        View Notices
      </Paper>
      {authContext.user.authorities.includes("admin") && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate('/signup')}
        >
          Add User
        </Paper>
      )}
    </Box>
  );
};

export default Home;
