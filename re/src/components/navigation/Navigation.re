let component = ReasonReact.statelessComponent("Navigation");

module Styles = {
  open Css;

  let container =
    style([
      display(flexBox),
      justifyContent(spaceAround),
      paddingBottom(px(20)),
    ]);
};

let make = _children => {
  ...component,
  render: _self =>
    <div className=Styles.container>
      <a href="#counter"> ("Counter" |> ReasonReact.string) </a>
      <a href="#form"> ("Form" |> ReasonReact.string) </a>
    </div>,
};