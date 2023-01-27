import React from "react";
import Alert from "@mui/material/Alert";

export const AlertMessage = (props: any) => {
    return (
        <React.Fragment>
            <div>
            <Alert severity={ props.severity}>{ props.alertMessage }</Alert>
            </div>
        </React.Fragment>
    )
}