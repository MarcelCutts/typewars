import * as React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import Input from "../input";
import Navigation from "../navigation";
import Title from "../title";
import Counter from "../counter";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Title content="Mini Admin!" />
        <Navigation />
        <Route exact={true} path="/" component={Counter} />
        <Route path="/form" component={Input} />
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
