import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import { injectGlobal } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

// @ts-ignore : Hack to make TS compiler happy
// about no unassigned expressions and no unused variables
const _ = injectGlobal`
  body {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
