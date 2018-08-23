module GetDefaultInput = [%graphql
  {|
    query {
        form {
          input
        }
      }
  |}
];

module GetDefaultInputQuery = ReasonApollo.CreateQuery(GetDefaultInput);

module UpdateInput = [%graphql
  {|
    mutation UpdateForm($content: String!) {
      updateForm(content: $content)
    }
  |}
];

module UpdateInputMutation = ReasonApollo.CreateMutation(UpdateInput);

let updateEvent = e =>
  UpdateInput.make(~content=ReactEvent.Focus.currentTarget(e)##value, ());

let component = ReasonReact.statelessComponent("Input");

let make = _children => {
  ...component,
  render: _self =>
    <GetDefaultInputQuery>
      ...(
           ({result}) =>
             switch (result) {
             | Loading => <div> ("LOADING" |> ReasonReact.string) </div>
             | Error(error) =>
               <div> (error##message |> ReasonReact.string) </div>
             | Data(response) =>
               <UpdateInputMutation>
                 ...(
                      (mutation, {result}) =>
                        <div>
                          <input
                            defaultValue=response##form##input
                            onBlur=(
                              e =>
                                mutation(
                                  ~variables=updateEvent(e)##variables,
                                  (),
                                )
                                |> ignore
                            )
                          />
                          (
                            switch (result) {
                            | Data(a) =>
                              <div>
                                (a##updateForm |> ReasonReact.string)
                              </div>
                            | _ => ReasonReact.null
                            }
                          )
                        </div>
                    )
               </UpdateInputMutation>
             }
         )
    </GetDefaultInputQuery>,
};