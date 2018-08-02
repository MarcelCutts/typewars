import * as React from "react";
import { shallow } from "enzyme";
import Title from ".";

describe("Title component", () => {
  test("renders", () => {
    const component = shallow(<Title content="test" />);
    expect(component).toMatchSnapshot();
  });

  test("renders content as heading", () => {
    const component = shallow(<Title content="test" />);
    expect(component.find("H1").text()).toEqual("test");
  });
});
