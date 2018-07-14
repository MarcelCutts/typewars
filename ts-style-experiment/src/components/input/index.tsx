import * as React from "react";

// tslint:disable-next-line:no-console
const logger = (e: React.FormEvent<HTMLInputElement>) => console.log("✋", e.currentTarget.value);

const Input = ({ callback = logger }) => <input onBlur={callback} />;

export default Input;
