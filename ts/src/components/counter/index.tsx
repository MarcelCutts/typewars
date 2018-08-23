import * as React from "react";
import { withStateHandlers, StateHandlerMap, defaultProps, compose } from "recompose";
import styled from "styled-components";

const CounterContainer = styled.div`
  background-color: black;
  padding: 30px;
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

type ICounter = IState & IUpdaters;

// Had to disavle JSX-NO-LAMBDA because interface too brittle
// to pass down higher order function
const Counter: React.StatelessComponent<ICounter> = ({
  counter,
  incrementOn,
  decrementOn,
  resetCounter
}: ICounter) => (
  <CounterContainer>
    <div>
      <h3>Counter: {counter}</h3>
      <button onClick={() => incrementOn(2)}>Inc</button>
      <button onClick={() => decrementOn(3)}>Dec</button>
      <button onClick={resetCounter}>Reset</button>
    </div>
  </CounterContainer>
);

interface IState {
  counter: number;
}

interface IInitialProps { initialCounter: number }

/* 
 * The incrementing functions should be defined as 
 * counter:number) => (value: number) => IState
 * but due to the @types file defining the types for withStateHandlers as
 * InferableComponentEnhancerWithProps<TOutter & TState &TUpdates, TOutter
 * it always needs to be indexible and we lose type safety of the 
 *  functions we put in. 
 */
interface IUpdaters extends StateHandlerMap<IState> {
  incrementOn: (n: number) => IState; // (counter:number) => (value: number) => IState is
  decrementOn: (n: number) => IState;
  resetCounter: () => IState;
}

const counterState = withStateHandlers<IState, IUpdaters, IInitialProps>(
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

// This passes even if we make it a string!
const defaultCounter = defaultProps({ initialCount: 0 });

// This passes even if no default no is set
const enhance = compose<ICounter, IInitialProps>(
  defaultCounter,
  counterState
);

export default enhance(Counter);
