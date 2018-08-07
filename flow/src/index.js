import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { injectGlobal } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
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

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
