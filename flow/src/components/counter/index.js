// @flow strict
import React from "react";
import { withStateHandlers, defaultProps, compose } from "recompose";
import type { HOC } from "recompose";
type CounterProps = {
  counter: number,
  incrementOn: number => void,
  decrementOn: number => void,
  resetCounter: () => void
};

const Counter = ({ counter, incrementOn, decrementOn, resetCounter }) => (
  <div>
    <h3>Counter: {counter}</h3>
    <button onClick={() => incrementOn(2)}>Inc</button>
    <button onClick={() => decrementOn(3)}>Dec</button>
    <button onClick={resetCounter}>Reset</button>
  </div>
);

const counterState = withStateHandlers(
  ({ initialCounter }) => ({
    counter: initialCounter
  }),
  {
    decrementOn: ({ counter }) => value => ({
      counter: counter - value
    }),
    incrementOn: ({ counter }) => value => ({
      counter: counter + value
    }),
    resetCounter: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter
    })
  }
);

const defaultCounter = defaultProps({
  initialCounter: 0
});

const enhance: HOC<*, CounterProps> = compose(
  defaultCounter,
  counterState
);

export default enhance(Counter);
