let component = ReasonReact.statelessComponent("Navigation");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <button onClick=(_e => ReasonReact.Router.push("/#counter"))>
        ("Counter" |> ReasonReact.string)
      </button>
      <button onClick=(_e => ReasonReact.Router.push("#form"))>
        ("Form" |> ReasonReact.string)
      </button>
    </div>,
};