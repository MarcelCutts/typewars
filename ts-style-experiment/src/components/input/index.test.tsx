import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import Input from ".";

import { configure, mount, shallow } from "enzyme";

configure({ adapter: new Adapter() });

describe("Input component", () => {
  test("renders", () => {
    const component = shallow(<Input />);
    expect(component).toMatchSnapshot();
  });

  test("calls handler onBlur", () => {
    const mockCallback = jest.fn().mockImplementation(e => undefined);
    const component = mount(<Input />);
    component.simulate("blur");
    expect(mockCallback).toHaveBeenCalled();
  });
});
