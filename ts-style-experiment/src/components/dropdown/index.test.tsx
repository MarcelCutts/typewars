import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import Dropdown from ".";

import { configure, mount, shallow } from "enzyme";

configure({ adapter: new Adapter() });

describe("Dropdown component", () => {
  test("renders", () => {
    const component = shallow(<Dropdown />);
    expect(component).toMatchSnapshot();
  });

  test("calls handler onBlur", () => {
    const mockCallback = jest.fn().mockImplementation(e => undefined);
    const component = mount(<Dropdown callback={mockCallback} />);
    component.simulate("change", { target: { value: "option2" } });
    expect(mockCallback).toHaveBeenCalled();
  });
});
