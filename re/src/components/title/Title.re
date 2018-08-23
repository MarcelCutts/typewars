module Styles = {
  open Css;

  let container =
    style([
      color(white),
      padding(px(20)),
      background(rgb(219, 77, 63)),
      fontFamily("montserrat"),
    ]);
};

let component = ReasonReact.statelessComponent("Title");

let make = (~content, _children) => {
  ...component,
  render: _self =>
    <h1 className=Styles.container> (content |> ReasonReact.string) </h1>,
};