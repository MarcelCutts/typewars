Css.(
  global(
    "body",
    [
      height(pct(100.)),
      width(pct(100.)),
      display(flexBox),
      flexDirection(column),
      justifyContent(center),
      alignItems(center),
      textAlign(center),
    ],
  )
);

type route =
  | Counter
  | Form;

let mapUrltoRoute = hash =>
  switch (hash) {
  | "counter" => Counter
  | "form" => Form
  | _ => Counter
  };

type action =
  | ChangeRoute(route);

type state = {route};

let reducer = (action, _state) =>
  switch (action) {
  | ChangeRoute(route) => ReasonReact.Update({route: route})
  };

let component = ReasonReact.reducerComponent("App");

let make = _children => {
  ...component,
  initialState: () => {
    route: ReasonReact.Router.dangerouslyGetInitialUrl().hash |> mapUrltoRoute,
  },
  reducer,
  didMount: self => {
    let token =
      ReasonReact.Router.watchUrl(url =>
        self.send(ChangeRoute(url.hash |> mapUrltoRoute))
      );
    self.onUnmount(() => ReasonReact.Router.unwatchUrl(token));
  },
  render: self =>
    <div>
      <Title content="Mini Admin" />
      <Navigation />
      (
        switch (self.state.route) {
        | Counter => <Counter />
        | Form => <Input />
        }
      )
    </div>,
};