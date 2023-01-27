import { useState, useEffect } from "react";

import { Box, Paper, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/system/Unstable_Grid";

import { Formik, Form, Field } from "formik";

import * as Axios from "../services/rest-api";

export const SignUpForm = (props: any) => {
  const userRole = useState(() => {
    return {
      roles: [],
    };
  });

  useEffect(() => {
    // Axios.getApi()
  });

  return (
    <>
      Sign Up
      <Paper elevation={5}>
        <Grid container spacing={2}></Grid>
      </Paper>
    </>
  );
};
