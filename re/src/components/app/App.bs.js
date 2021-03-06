// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Input$ReactTemplate = require("../input/Input.bs.js");
var Title$ReactTemplate = require("../title/Title.bs.js");
var Counter$ReactTemplate = require("../counter/Counter.bs.js");
var Navigation$ReactTemplate = require("../navigation/Navigation.bs.js");

function mapUrltoRoute(hash) {
  switch (hash) {
    case "counter" : 
        return /* Counter */0;
    case "form" : 
        return /* Form */1;
    default:
      return /* Counter */0;
  }
}

var component = ReasonReact.reducerComponent("App");

function make() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (self) {
              var token = ReasonReact.Router[/* watchUrl */1]((function (url) {
                      return Curry._1(self[/* send */3], /* ChangeRoute */[mapUrltoRoute(url[/* hash */1])]);
                    }));
              return Curry._1(self[/* onUnmount */4], (function () {
                            return ReasonReact.Router[/* unwatchUrl */2](token);
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */1][/* route */0];
              return React.createElement("div", undefined, ReasonReact.element(undefined, undefined, Title$ReactTemplate.make("Mini Admin", /* array */[])), ReasonReact.element(undefined, undefined, Navigation$ReactTemplate.make(/* array */[])), match ? ReasonReact.element(undefined, undefined, Input$ReactTemplate.make(/* array */[])) : ReasonReact.element(undefined, undefined, Counter$ReactTemplate.make(/* array */[])));
            }),
          /* initialState */(function () {
              return /* record */[/* route */mapUrltoRoute(ReasonReact.Router[/* dangerouslyGetInitialUrl */3](/* () */0)[/* hash */1])];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              return /* Update */Block.__(0, [/* record */[/* route */action[0]]]);
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.mapUrltoRoute = mapUrltoRoute;
exports.component = component;
exports.make = make;
/* component Not a pure module */
