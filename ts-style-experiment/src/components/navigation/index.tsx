import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Navigation = () => (
  <NavigationContainer>
    <Link to="/page1">Page 1</Link>
    <Link to="/page2">Page 2</Link>
  </NavigationContainer>
);

export default Navigation;
