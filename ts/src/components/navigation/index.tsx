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
    <Link to="/">Homepage</Link>
    <Link to="/form">Form</Link>
  </NavigationContainer>
);

export default Navigation;
