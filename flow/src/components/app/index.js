// @flow
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Title from "../title";
import Input from "../input";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Title content="Mini Admin!" />
        <Input />
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
