// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, TextField } from "@mui/material";
import { Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import { Formik, Form, Field } from "formik";

import * as schemaValiadtion from '../validation/signin-form-schema'

import * as Axios from "../services/rest-api"
import * as LocalStorage from '../common-services/localstorage'
import * as DTFormat from "../common-services/date-time"


export const SignUpForm = (props: any) => {
  /********************************* Hooks */

  // Called only once
  const [stateData, setState] = useState(() => {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: {
        id: 0,
        role: "",
      },
    };
  });

  // const [alertData, alertState] = useState(() => {
  //   return {
  //     isAlert: false,
  //     alertMessage: "",
  //     severity: "warning",
  //   }; 
  // });
  // const [enableRoute, routeSate] = useState({
  //   enable: false,
  //   path: "/todo-page/param",
  // });

  // React router Hook navigation

  const navigate = useNavigate();
  /******************************************************************** */

  const loadRoles = require("../dev-data/roles.json").data;
  const getRoles = async (url: string) => {
    try{
      const roles = await Axios.getApi(url)
      const formRoles = roles.data.resData.map((item: any) => ({id: item.roleId, role: item.roleName}))
      console.log("roles", roles)
      setState(pre => ({ ...pre, role: formRoles}))

    }catch(e){
      console.log(e)
    }

  } 
  useEffect(()=> {
    getRoles('/all-roles')
  }, [])


  const submitForm = async (
    values: Record<string, unknown | any>,
    formik: Record<any, any>
  ) => {
    try {
      console.log("Values", values);

      const payload = {
        email: values.email,
        password: values.password,
        name: values.userName,
        userRoleId: values.role.id,
        createdAt: DTFormat.getDateTime(),
      } as Record<string, any>;

      console.log("Payload data", payload);
      const resdData = await Axios.createApi("/create-user", payload);
      if(resdData.data.status){

        console.log("res data", resdData)
        formik.resetForm();
        navigate('/')
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="form-container">
        {/* {enableRoute.enable && <Link to={enableRoute.path} />} */}
        <Paper elevation={5}>
          <div className="card--header">
            <h2> Sign-Up </h2>
            <p>Fill this form to Register</p>
          </div>
          <hr />
          <div className="form__container">
            <Formik
              initialValues={stateData}
              validationSchema={ schemaValiadtion.signUpFormValidationSchema }
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
                    name="email"
                    type="email"
                    as={TextField}  
                    fullWidth
                    label="Email" 
                    error={ Boolean(errors.email)} 
                    helperText={errors.email}
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
                    name="confirmPassword"
                    type="password"
                    as={TextField}
                    fullWidth
                    label="Confirm Password "
                    error={ Boolean(errors.confirmPassword) }
                    helperText={ errors.confirmPassword}
                  ></Field>
                  <Box mt={2}></Box>
                  <Field
                    name="role"
                    type="text"
                    options={ stateData.role }
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
                    SignUp
                  </Button>
                  <p> Click to <Link to="/">signin</Link> </p>
                </Form>
              )}
            </Formik>
          </div>
        </Paper>
      </div>
    </>
  );
};
