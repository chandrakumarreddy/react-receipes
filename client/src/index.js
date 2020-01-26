import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import "./index.css";

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </Router>
);

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
