import * as React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import Dropdown from "../dropdown";
import Input from "../input";
import Navigation from "../navigation";
import Title from "../title";

const client = new ApolloClient({ uri: "http://localhost:4000" });

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Title content="Mini Admin!" />
        <Navigation />
        <Route path="/page1" component={Input} />
        <Route path="/page2" component={Dropdown} />
      </div>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
