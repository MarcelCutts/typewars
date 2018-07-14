import * as React from "react";
import styled from "../../styled-components";

const RedHeader = styled.h1`
  color: red;
  padding: 20px;
`;

interface IProps {
  content: string;
}

const Title = ({ content }: IProps) => <RedHeader>{content}</RedHeader>;

export default Title;
