# 🔥 TYPEWARS 🔥

Which type system is best? Let's find out!

Here we explore the ease and goodness of typing with the two most prominent competitors in the static typing space, TypeScript and Flow. Each application we type is an instance of an existing application's patterns and libraries which are identical in functionality and consist of

- Core components from create-react-app
- Styles supplied by [styled-components](https://www.styled-components.com/)
- Routing through two pages with [react-router](https://reacttraining.com/react-router/)
- Multiple layers of composed higher-order-components through [recompose](https://github.com/acdlite/recompose)
- Query and Mutation of form content with [Apollo](https://www.apollographql.com/)

Each project is started from their respective official `create-react-app` generator, and there are three applications within this repository. Two front-end ones, `ts` and `flow`, as well as a server providing data via graphql, `graphql-server`.

#### GraphQL API
1. Go into `/graphql-server`
1. Install dependencies with `yarn`
1. Run with `node index.js`

Your server is now running at [http://localhost:4000](http://localhost:4000). A playground is also available at this address.

#### TypeScript and Flow react applications
1. Go into `/ts` or `flow` for the TypeScript or Flow applications respectively
1. Install dependencies with `yarn`
1. Run with `yarn start`


Table of Contents 
=================
  * [The contestants 🥊](#the-contestants-)
  * [Set up & Configuration 🏗](#set-up--configuration-)
  * [Tooling 🛠](#tooling-)
  * [Wielding Types in Anger ⚡️](#wielding-types-in-anger-%EF%B8%8F)
  * [Errors ❗️](#errors-%EF%B8%8F)
  * [Lock-in 🔐](#lock-in-)
  * [Progressive Inclusion 🎻](#progressive-inclusion-)
  * [Thrilling Conclusion 💥](#thrilling-conclusion-)


# The contestants 🥊

[TypeScript](https://www.google.co.uk/search?q=typescript&oq=typescript&aqs=chrome.0.69i59j69i60l3j69i65l2.1059j1j1&sourceid=chrome&ie=UTF-8) (TS) has been kicking around since 2012 and is a language that promises "JavaScript that scales", touting itself as an approximate (but not entirely true) superset of JavaScript (JS). It most prominently takes influence from C#, with many of the go-to docs encouraging class inheritance structures and use of Interfaces.

[Flow](https://flow.org/en/) is a Facebook developed type chacker that sits on top of JS and leverages the OCaml type systems. As it is not a replacement language you can write idiomatic JS as usual and add in types as necessary, but it does mean type checking is removed from the compile step and has to be run independently.


# Set up & Configuration 🏗
Setting up a new library or language can be easy or hard, depending on the sensibleness of the defaults and the emphasis on developer experience. Overhead from thinking about configuration is wasted effort, and will require maintenance as new rules and flags are added.

The current trend is removing build process work from the engineer, with tools such as prettier attempting to have zero configuration, and popular bundlers aiming for similar. 

### TypeScript
At the time of writing, the TS compiler comes with 54 compiler flags and the standard linter, TS Lint, has over 153 rules that can each be configured in a number of ways.

In this toy project, the rules came into internal conflict and no community standard on what rules or compiler flags to use exist, which has been reflected in twitter polling TS enthusiasts.

Despite every attempt to the contrary, this project ended up having **1 flag** and **4 linter rules** being added to allow the crafting of the simple project.


### Flow
Flow had to be added manually to a regular `create-react-app` instance, through `yarn flow init`. This created an empty configuration file that required no updates throughout the creation of this project. Files are then added into flow by placing `// @flow` at the top of the file. This caused no issues.

***WINNER: FLOW*** 

# Tooling 🛠
The tools we use to interact with the type system are critical. Shaky, unreliable, or unhelpful tooling can make a fantastic type system become mediocre. In this instance I have compared the tooling available within the popular VSCode editor.

### TypeScript
VSCode is a fantastic editor with deeply caked-in TypeScript support that makes it a joy to use straight out of the box. Such first party support makes it rather wonderful. Plugins for other editors exist which are unlikely to be quite as polished, but I have not tested these.

### Flow
Two different extensions for flow exist in the VSCode marketplace, and both seem to work fine. The unofficial one required pointing to the flow within `node_modules` rather than globally which was a bit of a pain.

***WINNER: TS*** 

# Wielding Types in Anger ⚡️

The meaty bit! TypeScript 3 is put head-to-head against Flow 0.78. 

Two parts of the application stood out as the more challenging parts to type, and we will be focused on those. The first is the form component that relies on getting data via Apollo, placing that data into a default attribute on an input, and hooking up to a mutation that fires when an `onBlur` event occurs with whatever string is currently inside. The second is a simple counter that leverages two layers of `Recompose`'s higher-order-components, `withStateHandlers` and `defaultProps`, which are then composed together.

Some of this will be subjective, as frustration does not have an international unit of measure.


### TypeScript 
Without `strict mode`, TS will allow a large number of type unsafe actions to occur, giving the user the feeling of writing solid code and perhaps forgoing unit tests under the assumption the type system will save them. 

Examples of what is allowed by the compiler without strict mode include

- Implicit `any`
- Implicit use of  `this`
- No checking of `null` or `undefined`
- No checking that properties are initialised
- No checking on function types.

In many ways, this makes TS quite scarily underpowered while giving the impression that type checking has occurred.

A strict mode exists to solve all these problems, however it comes with its own problems. It often results in unhelpful error reporting and as it combines type checking with TS Lint passing, can often waste the developers time in a loop that can only be solved by writing code in an unreasonable way or configuration.


An example of this is given here. You cannot nest interfaces in interfaces, and suggests you use a type. However, if you declare a type, you are told to use an interface instead.

```ts
interface IFunction {
	(s: string): boolean;
}

interface IObject {
	message: string
	isMessage: IFunction
}

// Cannot nest interfaces, suggest to use type
```

```typescript
type Function {
	(s: string): boolean;
}

interface IObject {
	message: string
	isMessage: Function
}

// Suggests to use interface instead of type for function signature
```

```typescript
interface IFunction {
	(s: string): boolean;
}

interface IObject {
	message: string
	isMessage: (s: string): boolean;
}

// A solution that is makes the compiler/default linter happy
```

This made typing the application quite frustrating at points as the primary challenge was to guess the desire of the compiler, which often meant rewriting code in what felt like arbitary shapes.

Within the form component, Apollo use could be typed with decent amount of effort. The easiest solution to stating expected query and mutation structures is through extending classes provided by Apollo.

```ts
// This is a little clunky
class FormInputQuery extends Query<IQueryData> {}
class FormUpdateMutation extends Mutation<IMutationData, IMutationVariables> {}
```

The most challenging portion of this form was attempting to pass a mutation function to an `onClick` event. Event typing is not obvious in the documentation and I relied on search StackOverflow for the correct answer. More difficult was attempting to deduce how to type the mutation function itself, which takes a generic `MutationFn<>`, separate from `MutationFunc<>` for similar but marginally different cases. This was non-intuitive and was solved by reading Apollo's source, rather than being helped by tooling or documentation.

The counter ended up being quite difficult to try and type, as it relied on a combination of utility types such as `StateHandlerMap`, understanding type indexes and a set of intersection types. 

```ts
/* 
 * The incrementing functions should be defined as 
 * (counter:number) => (value: number) => IState
 * but due to the @types file defining the types for withStateHandlers as
 * InferableComponentEnhancerWithProps<TOutter & TState &TUpdates, TOutter
 * it always needs to be indexible and we lose type safety of the 
 * functions we put in. 
 */
interface IUpdaters extends StateHandlerMap<IState> {
  incrementOn: (n: number) => IState; // (counter:number) => (value: number) => IState is
  decrementOn: (n: number) => IState;
  resetCounter: () => IState;
}
```

While this took a significant amount of time to figure out, most worryingly types of props are not preserved when composing higher order components.

```
const counterState = withStateHandlers<IState, IUpdaters, IInitialProps>(
  ({ initialCounter }) => ({
    counter: initialCounter
  }), {
	...
  }
);

// This passes even if we make it a string!
const defaultCounter = defaultProps({ initialCounter: 0 });

// This passes even if no default no is set
const enhance = compose<ICounter, IInitialProps>(
  defaultCounter,
  counterState	
);
```

As one of the primary goals for the type system in this case is to add contract safety between these opaque prop handling layers, it massively reduces the usefulness of TypeScript.

### Flow

Flow is much stricter out of the box and will not allow `undefined`-like or `any` behaviour. Placing `// @flow` strict at the top of the file will also disallow `Object`, `Function` and `sketchy-null` code.

Little typing by hand had to be done, with some files achieving 100% typed-ness by inference alone.

For the form, the Query and Mutation a number of helper types are provided which do not rely on extending classes and are used in the familiar way on props themselves.


```js
const Input = () => (
  <Query query={GET_DEFAULT_INPUT_CONTENT}>
    {({ loading, error, data }: QueryRenderProps<QueryResponse>) => {
      if (loading) {
        return <div>LOADING</div>;
      }

      if (error) {
        return <div>ERROR</div>;
      }

      return (
        <Mutation mutation={UPDATE_FORM_CONTENT}>
          {(
            updateForm: MutationFunction<MutationResponse, MutationVariables>,
            response: MutationResult<MutationResponse>
          ) => (
            <div>
              <input
                onBlur={updateFormEvent(updateForm)}
                defaultValue={data && data.form && data.form.input}
              />
              <div>{response && response.data && response.data.updateForm}</div>
            </div>
          )}
        </Mutation>
      );
    }}
  </Query>
```

Most helpfully, the mutation function passed into the event did not need to be typed as it was inferred from use inside the component, reducing the need to hunt down how to declare types in specific ways.

The layered higher-order-component work was trivial. `Recompose` offers a `HOC` helper type which takes the final visual component's types and infers the rest.

```js
type CounterProps = {
  counter: number,
  incrementOn: number => void,
  decrementOn: number => void,
  resetCounter: () => void
};

const enhance: HOC<*, CounterProps> = compose(
  defaultCounter,
  counterState
);
```

Any attempt to not set a default, or provide a string as a default value is immediately flagged - providing a contract check between all layers with minimal effort.



***WINNER: FLOW***




# Errors ❗️

Helpful errors are critical to a good type-checker. Little is more frustrating in the universe than being told _something is wrong_ but having no clue or inkling that that _thing_ might be. Frustration leads to the slow abandonment of type systems as it becomes a time consuming chore rather than a silicon-powered pair buddy.

### TypeScript

Simple errors are caught and the messages are functional. Missing a prop, for example, will result in a message like so

```bash
(16,10): Type '{ contant: string; }' is not assignable to type 'IProps'.
  Property 'content' is missing in type '{ contant: string; }'.
```

However more complex interactions seem to stump the compiler. An example using `Styled-Components` is served up here: when using this library and writing CSS within a template literal, a mistake will force the compiler to fail.

```js
const RedHeader = styled.h1`
  color: red // Error here of no semi colon
  padding: 20px;
`;
```


```bash
(7,14): Argument of type 'string' is not assignable to parameter of type 'MutationOptions<any, OperationVariables> | undefined'.
```

The above does not help you isolate what has gone wrong or the library it has gone wrong in. 

### Flow

Flow seemed to have no difficulties in managing errors and provides lovely colourised outputs with plenty of context to help the engineer track down the root cause of trouble.

```bash
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ src/components/app/index.js:17:10

Cannot create Title element because property content is missing in props [1] but exists in Props [2].

     src/components/app/index.js
     14│   <ApolloProvider client={client}>
     15│     <BrowserRouter>
     16│       <div>
 [1] 17│         <Title contant="Mini Admin!" />
     18│         <Navigation />
     19│         <Route exact path="/" component={Counter} />
     20│         <Route path="/form" component={Input} />

     src/components/title/index.js
 [2] 16│ const Title = ({ content }: Props) => <GreyHeader>{content}</GreyHeader>;

```

One downside in comparison to TS is the live in-editor checking does not have the same prettification and will revert to more functional messages without the extra context. However, if these aren't illuminating enough, teasing out the full error is a small step.

***WINNNER: FLOW***

# Lock-in 🔐

Unlike Flow or ReasonML, there is an element of lock in with TS. Should you wish to migrate away from TS, it can be difficult as the compiled output for more complex cases will not be readable or at least pleasant-to-maintain JS.

```typescriot
// Our TS code
class Animal {
    constructor(public name: string) { }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
```

```
// Generated JavaScript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
```

***WINNER: FLOW***

# Progressive Inclusion 🎻
To include TS on an existing project you will need to convert exists JavaScript files manually if you wish to have a fully typed codebase. This stands in contrast to flow, which can infer much of the work by simply placing `// @flow` at the top of a file.

In addition, compilation becomes a two step process and requires adding the TS compiler loader into babel, further pushing down on already slow build processes common in modern frontend development.

***WINNER: FLOW***

# Thrilling Conclusion 💥
TypeScript does offer a universe which is better than JavaScript, but does not provide reliable type safety without exceptional effort and nuanced knowledge of the blind spots. It encourages patterns that are familiar and well suited to C# and Java communities, which is wonderful if your team is approaching front-end from that history, but less useful if training functional engineers. Throughout this process I felt continuously underwhelmed by TypeScript as a platform.

Flow has room to improve in tooling but provides types at a lower cost than the TS alternative.

In this instance, the lack of preserving types through higher-order-component composition makes TS an unacceptable choice for the project in mind, **making Flow our ultimate winner 🎉**.



