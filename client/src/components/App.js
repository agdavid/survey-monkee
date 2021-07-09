// rendering layer control (React)
import React, { Component } from "react";
// import the router brain (look at URL and handle component display)
import { BrowserRouter, Route } from "react-router-dom";
// connect react with redux
import { connect } from "react-redux";

import * as actions from "../actions";
import Header from "./Header";

const Dashboard = () => {
  return <h2>Dashboard</h2>;
};
const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};
const Landing = () => {
  return <h2>Landing</h2>;
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// connect App to redux
// provide access to actions object
export default connect(null, actions)(App);
