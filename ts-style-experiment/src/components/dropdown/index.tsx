import * as React from "react";

// tslint:disable-next-line:no-console
const logger = (e: React.FormEvent<HTMLSelectElement>) => console.log("✋", e.currentTarget.value);

const Dropdown = ({ callback = logger }) => (
  <select onChange={callback}>
    <option value="option1">option1</option>
    <option value="option2">option2</option>
    <option value="option3">option3</option>
  </select>
);

export default Dropdown;
