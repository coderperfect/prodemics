import { Card, CardContent, Container, Grid } from "@mui/material";
import * as React from "react";

const NoticeSummary = (props) => {
  return (
    <Grid
      item
      lg={12}
      xs={12}
      sx={{ display: "flex", justifyContent: "center", textAlign: "left" }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{ marginBottom: "1rem", height: "3.5rem", cursor: "pointer" }}
          onClick={() => props.onNoticeClick(props.notice.id)}
        >
          <CardContent>{props.notice.title}</CardContent>
        </Card>
      </Container>
    </Grid>
  );
};

export default NoticeSummary;
