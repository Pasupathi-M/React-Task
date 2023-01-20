// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, useState } from "react";
import { TextField } from "@mui/material";
import { Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { AlertMessage } from "./alert-box";
import { Link, useNavigate} from "react-router-dom"

export const SignInForm = (props: any) => {

  /********************************* Hooks */

  // Called only once 
  const [stateData, setState] = useState(() => {
    return {
      userName: "",
      password: "",
      role: {
        id: 0,
        role: ''
      },
    };
  });

  const [alertData, alertState] = useState(() => {
    return {
      isAlert: false,
      alertMessage: '',
      severity: 'warning'
    }
  })
  const [enableRoute, routeSate] = useState({
    enable: false,
    path: '/todo-page/param'
  });

  // React router Hook navigation

  const navigate = useNavigate();
  /******************************************************************** */

  const loadRoles = require("../dev-data/roles.json").data;

  const handleChanges = (values: any, field: string, dropdownVal?: any) => {
    if (alertData.isAlert) {
      alertState((pre) => {
        return { ...pre, isAlert: false };
      });
    }
    console.log("dropdownVal", dropdownVal);
    const { name } = dropdownVal ? { name: "role" } : values.target;
    const { value } = dropdownVal ? { value: dropdownVal } : values.target;
    setState((preValue) => {
      return { ...preValue, [name]: value };
    });
  };

  const submitForm = () => {
    console.log("Form submitted...", stateData);
    if (!stateData.userName.trim()) {
      alertState(pre => { return {
        ...pre,
        isAlert: true,
        alertMessage: "Please enter username"
      }})
      return
    } else if (!stateData.password.trim()) {
      alertState(pre => { return {
        ...pre,
        isAlert: true,
        alertMessage: "Please enter password"
      }})
      return
    } else {
      // const display = JSON.stringify({
      //   Username: stateData.userName,
      //   Password: stateData.password,
      //   Role: stateData.role.role,
      // });
      navigate("/todo-page", { state: stateData})
      
    }
  }
  return (
    <>
      <div className="form-container">
      { alertData.isAlert && 
      <AlertMessage
        severity= {alertData.severity}
        alertMessage={alertData.alertMessage}
      /> }
      {
       enableRoute.enable && <Link to={ enableRoute.path }/> 
      }
        <Paper elevation={5}>
          <div className="card--header">
            <h2> Sign-In </h2>
            <p>Fill this form to Login</p>
          </div>
          <hr />
          <form>
            <div className="signin-formgroup">
              <div className="signin field-username">
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  placeholder="username"
                  value={stateData.userName}
                  name="userName"
                  onChange={(e) => {
                    handleChanges(e, "username");
                  }}
                  sx={
                    {
                      width: '100%'
                    }
                  }
                />
              </div>

              <div className="signin field-password">
                <TextField
                  required
                  id="outlined-required"
                  label="Password"
                  placeholder="password"
                  type="password"
                  value={stateData.password}
                  name="password"
                  onChange={(e) => {
                    handleChanges(e, "password");
                  }}
                  sx={
                    {
                      width: '100%'
                    }
                  }
                />
              </div>

              <div className="signin field-roles">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={loadRoles}
                  getOptionLabel={(option: any) => option.role}
                  renderInput={(params) => (
                    <TextField {...params} label="Roles" />
                  )}
                  autoComplete={true}
                  placeholder="select role"
                  onChange={(e, newValue) => {
                    handleChanges(e, "role", newValue);
                  }}
                  value={stateData.role}
                />
              </div>

              <div className="signin btn btn-signin">
                <Button
                  variant="outlined"
                  onClick={() => {
                    submitForm();
                  }}
                  sx={
                    {
                      width: '100%'
                    }
                  }
                >
                  Signin
                </Button>
              </div>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
  
}


