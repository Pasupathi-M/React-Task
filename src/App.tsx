import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import AppComponent from "./components/index"

import './css/signin-form.css'

export default class App extends Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super({});
  }

  render() {
    return (
      <React.Fragment>
        <div className="signin-form-container">
          <AppComponent.SignInForm />
        </div>
      </React.Fragment>
    );
  }
}
