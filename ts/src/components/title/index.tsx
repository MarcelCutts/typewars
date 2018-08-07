import * as React from "react";
import styled from "../../styled-components";

const BlueHeader = styled.h1`
  color: white;
  padding: 20px;
  background: #294e80;
  font-family: montserrat;
`;

interface IProps {
  content: string;
}

const Title = ({ content }: IProps) => <BlueHeader>{content}</BlueHeader>;

export default Title;
