import React, { Children } from "react";
// import logo from "./logo.svg";
import "./App.css";
import AppComponent from "./components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./css/signin-form.css";
import "./css/todo.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppComponent.SignInForm />,
    },
    {
      path: "/signup",
      element: <AppComponent.SignUpForm />,
      // Children   -> Only for rendering child routes time
    },
    {
      path: "todo-page",
      element: <AppComponent.Todo />,
    },
    {
      path: "todo-page-v2",
      element: <AppComponent.TodoWithApi />,
    },
    {
      path: "multi-form",
      element: <AppComponent.MultiForm />,
    },
  ]);
  return (
    <>
    {/* <span className="alert__box" style={{
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }}>
      <AppComponent.AlertMessage severity="error" alertMessage="checking" />
    </span> */}
      <div className="signin-form-container">
        <RouterProvider router={routes} />
        {/* <AppComponent.SignInForm /> */}
      </div>
    </>
  );
}

export default App;
