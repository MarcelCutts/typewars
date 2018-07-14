import * as React from "react";
import "./App.css";
import Input from "./Input";
import { injectGlobal } from "./styled-components";

import Title from "./Title";

// @ts-ignore : Hack to make TS compiler happy
// about no unassigned expressions and no unused variables
const _ = injectGlobal`
  body {
    display: flex;
    flex-direction: column;
  }
`;

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Title content="Mini Admin!" />
        <Input />
      </div>
    );
  }
}

export default App;
