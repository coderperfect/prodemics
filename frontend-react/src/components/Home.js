import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Home = () => {
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
          cursor: 'pointer'
        }}
      >
        View Notices
      </Paper>
    </Box>
  );
};

export default Home;
