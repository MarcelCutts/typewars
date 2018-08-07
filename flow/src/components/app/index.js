// @flow
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Title from "../title";
import Navigation from "../navigation";
import Input from "../input";
import Counter from "../counter";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Title content="Mini Admin!" />
        <Navigation />
        <Route exact path="/" component={Counter} />
        <Route path="/form" component={Input} />
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
