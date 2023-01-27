// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, TextField } from "@mui/material";
import { Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import { Formik, Form, Field } from "formik";

import { signInFormValidationSchema } from '../validation/signin-form-schema'


export const SignInForm = (props: any) => {
  /********************************* Hooks */

  // Called only once
  const [stateData, setState] = useState(() => {
    return {
      userName: "",
      password: "",
      role: {
        id: 0,
        role: "",
      },
    };
  });

  const [alertData, alertState] = useState(() => {
    return {
      isAlert: false,
      alertMessage: "",
      severity: "warning",
    }; 
  });
  // const [enableRoute, routeSate] = useState({
  //   enable: false,
  //   path: "/todo-page/param",
  // });

  // React router Hook navigation

  const navigate = useNavigate();
  /******************************************************************** */

  const loadRoles = require("../dev-data/roles.json").data;





  const submitForm = (
    values: Record<string, unknown>,
    formik: Record<any, any>
  ) => {
    console.log("Values", values);
    formik.resetForm()
    navigate('/todo-page-v2', {state: values})

   
  };
  return (
    <>
      <div className="form-container">
        {/* {enableRoute.enable && <Link to={enableRoute.path} />} */}
        <Paper elevation={5}>
          <div className="card--header">
            <h2> Sign-In </h2>
            <p>Fill this form to Login</p>
          </div>
          <hr />
          <div className="form__container">
            <Formik
              initialValues={stateData}
              validationSchema={ signInFormValidationSchema }
              onSubmit={(values, formHelper) => {
                submitForm(values, formHelper);
              }}
            >
              {({
                values,
                errors,
                setFieldValue
              }) => (
                <Form>
                  <Field
                    name="userName"
                    type="text"
                    as={TextField}  
                    fullWidth
                    label="Username" 
                    error={ Boolean(errors.userName)} 
                    helperText={errors.userName}
                  ></Field>
                  <Box mt={2}></Box>
                  <Field
                    name="password"
                    type="password"
                    as={TextField}
                    fullWidth
                    label="Password"
                    error={ Boolean(errors.password) }
                    helperText={ errors.password}
                  ></Field>
                  <Box mt={2}></Box>
                  <Field
                    name="role"
                    type="text"
                    options={ loadRoles }
                    component={ Autocomplete }
                    getOptionLabel={(option: any) => option.role}
                    onChange={(e: any, value: any) => { setFieldValue("role", value)}}
                    renderInput={(params: any) => (
                      <TextField
                       { ...params}
                       label="Role"
                       error={ Boolean(errors.role?.role) }
                       helperText={ errors.role?.role }
                      />)}                     
                  ></Field>
                  <Box mt={2}></Box>
                  <Button type="submit" variant="contained" fullWidth>
                    SignIn
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Paper>
      </div>
    </>
  );
};
