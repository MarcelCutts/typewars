// @flow strict
import React from "react";
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
    <Link to="/">Recompose</Link>
    <Link to="/form">Form+Apollo</Link>
  </NavigationContainer>
);

export default Navigation;
