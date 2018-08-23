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

ReactDOMRe.renderToElementWithId(
  <ReasonApollo.Provider client=Client.instance>
    <App />
  </ReasonApollo.Provider>,
  "app",
);