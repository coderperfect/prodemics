import { Card, CardContent, Grid } from "@mui/material";
import * as React from "react";

const NoticeSummary = (props) => {
  return (
    <Grid
      item
      xs={12}
      sx={{ display: "flex", justifyContent: "center", textAlign: "left" }}
    >
      <Card
        sx={{ marginBottom: "1rem", width: "60%", height: "3.5rem", cursor: "pointer" }}
        onClick={() => props.onNoticeClick(props.notice.id)}
      >
        <CardContent>{props.notice.title}</CardContent>
      </Card>
    </Grid>
  );
};

export default NoticeSummary;
