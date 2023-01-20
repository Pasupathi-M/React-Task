import React, { Children } from "react";
// import logo from "./logo.svg";
import "./App.css";
import AppComponent from "./components/index";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./css/signin-form.css";
import "./css/todo.css"

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppComponent.SignInForm />,
      // Children   -> Only for rendering child routes time
    },
    {
      path: 'todo-page',
      element: <AppComponent.Todo />
    }
  ]);
  return (
    <>
      <div className="signin-form-container">
        <RouterProvider router={routes} />
        {/* <AppComponent.SignInForm /> */}
      </div>
    </>
  );
}

export default App;
