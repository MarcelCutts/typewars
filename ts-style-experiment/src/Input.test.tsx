import * as React from "react";

import { shallow, mount } from "enzyme";
import Input from "./Input";

import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Input component", () => {
  test("renders", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  test("calls handler onBlur", () => {
    const mockCallback = jest.fn().mockImplementation(e => undefined);
    const component = mount(<Input callback={mockCallback} />);
    console.log(component.find("input"));
    component.simulate("blur");
    expect(mockCallback).toHaveBeenCalled();
  });
});
