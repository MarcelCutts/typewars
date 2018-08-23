type route =
  | Counter
  | Form;

type action =
  | ChangeRoute(route);

let mapUrltoRoute = hash =>
  switch (hash) {
  | "counter" => Counter
  | "form" => Form
  | _ => Counter
  };

type state = {route};

let component = ReasonReact.reducerComponent("App");

let make = _children => {
  ...component,
  initialState: () => {
    route: ReasonReact.Router.dangerouslyGetInitialUrl().hash |> mapUrltoRoute,
  },
  reducer: (action, _state) =>
    switch (action) {
    | ChangeRoute(route) => ReasonReact.Update({route: route})
    },
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