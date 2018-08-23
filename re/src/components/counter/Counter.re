module WithCountState =
  WithState.Make({
    type state = int;
  });
let component = ReasonReact.statelessComponent("WithState");
let make = _children => {
  ...component,
  render: _self =>
    <WithCountState initialState=0>
      ...(
           ({state, send}) =>
             <div>
               ("Count: " ++ string_of_int(state) |> ReasonReact.string)
               <button onClick=(_ => send(Set(state + 2)))>
                 ("Inc" |> ReasonReact.string)
               </button>
               <button onClick=(_ => send(Set(state - 3)))>
                 ("Dec" |> ReasonReact.string)
               </button>
             </div>
         )
    </WithCountState>,
};