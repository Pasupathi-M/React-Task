import React from "react";
import Alert from "@mui/material/Alert";

export const AlertMessage = (props: any) => {
  return (
    <>
      <div className="alert__box">
        <Alert style={{
          marginTop: "100px" 
        }} severity={props.severity}>{props.alertMessage}</Alert>
      </div>
    </>
  );
};
