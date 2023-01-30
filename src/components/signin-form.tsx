import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"

import { Box, Paper, TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/system/Unstable_Grid";

import { Formik, Form, Field } from "formik";

import * as Axios from "../services/rest-api";
import * as schemaValiadtion from "../validation/signin-form-schema";
import * as LocalStorage from "../common-services/localstorage"
import { AlertMessage } from "./alert-box"

export const SignInForm = (props: any) => {
  const [initData, setSate] = useState({
    email: "",
    password: "",
  });
  const [alert, alertState] = useState({flag: false, message: ''})
  useEffect(() => {
    // Axios.getApi()
  });

  const navigate = useNavigate()

  const submitForm = async (values: Record<string, any>, formik: any) => {
    try{
      const resData = await Axios.createApi('/signin-user', values)
      console.log("res", resData)
      if(resData.data.status){
        console.log("Successfully logged in", resData)
        LocalStorage.add('access-token', resData.data.token)
        navigate('/todo-page-v2', {
          state: { ...resData.data } 
        })
      }else {
        alertState(pre => ({ ...pre, flag: true, message: resData.data.message}))
      }
    }catch(e) {
      console.log(e)
    }
    console.log("Sign up data", values);
  };

  return (
    <>
      {/* {true ? (
        <AlertMessage severity="error" alertMessage={"Dummy message"} />
      ) : (
        ""
      )} */}
      <div className="form-container">
        <div className="card--header">
          <h2> Sign-In </h2>
          <p>Fill this form to Sign In</p>
        </div>
        <hr />
        <Formik
          initialValues={initData}
          validationSchema={schemaValiadtion.signInFormValidationSchema}
          onSubmit={(values, formHelper) => {
            submitForm(values, formHelper);
          }}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <Field
                name="email"
                type="text"
                as={TextField}
                fullWidth
                label="Email"
                error={Boolean(errors.email)}
                helperText={errors.email}
              ></Field>
              <Box mt={2}></Box>
              <Field
                name="password"
                type="password"
                as={TextField}
                fullWidth
                label="Password"
                error={Boolean(errors.password)}
                helperText={errors.password}
              ></Field>
              <Box mt={2}></Box>
              <Button type="submit" variant="contained" fullWidth>
                SignIn
              </Button>
            </Form>
          )}
        </Formik>
        <p>
          Don't have an account ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
};
