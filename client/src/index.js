import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";

import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import "./index.css";

import { GET_CURRENT_USER } from "./Queries/query";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      const tokenExpired = graphQLErrors.some(
        item => item.message === "token expired"
      );
      if (tokenExpired) localStorage.removeItem("token");
    }
    console.log(networkError);
  }
});

const Root = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route
          path="/signin"
          render={props => <Signin {...props} refetch={refetch} />}
        />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
