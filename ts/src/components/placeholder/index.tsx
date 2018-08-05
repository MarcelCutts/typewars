import * as React from "react";
import styled from "styled-components";

const BlackContainer = styled.div`
  background-color: black;
  padding: 30px;
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: 800;
`;

const Placeholder = () => <BlackContainer>Placeholder Content</BlackContainer>;

export default Placeholder;
