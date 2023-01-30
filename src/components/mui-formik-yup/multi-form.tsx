import * as React from "react";
import {
  Container,
  Grid,
  Box,
  Card,
  CardActions,
  CardHeader,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import { NavigateNext } from "@mui/icons-material";

export const MultiForm = (props: any) => {
  return (
    <>
      <Container >
        <Grid container spacing={2}>
          <Grid item>
            <h4> This is navigation bar</h4>
          </Grid>
          <Grid>
            <h4>Main form container</h4>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
