// @flow
import React from "react";
import Input, { GET_DEFAULT_INPUT_CONTENT, UPDATE_FORM_CONTENT } from ".";
import { MockedProvider } from "react-apollo/test-utils";
import { mount, shallow } from "enzyme";

const mocks = [
  {
    request: { query: GET_DEFAULT_INPUT_CONTENT },
    result: {
      data: { form: { input: "Content", __typename: "Form" }, __typename: "Form" }
    }
  },
  {
    request: { query: UPDATE_FORM_CONTENT }
  }
];

const failureMocks = [
  {
    error: new Error("Bang!"),
    request: { query: GET_DEFAULT_INPUT_CONTENT }
  }
];

describe("Input component", () => {
  test("renders", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  test("displays loading before data arrives", () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <Input />
      </MockedProvider>
    );
    expect(component.text()).toEqual("LOADING");
  });

  test("displays content after data arrives", async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Input />
      </MockedProvider>
    );

    await new Promise(r => setTimeout(r));
    component.update();
    expect(component.find("input").props().defaultValue).toEqual("Content");
  });

  test("displays error if request fails", async () => {
    const component = mount(
      <MockedProvider mocks={failureMocks} addTypename={false}>
        <Input />
      </MockedProvider>
    );

    await new Promise(r => setTimeout(r));
    component.update();
    expect(component.text()).toEqual("ERROR");
  });
});
