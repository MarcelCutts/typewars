// @flow strict
import React from "react";
import styled from "styled-components";

const GreyHeader = styled.h1`
  color: #e8bd36;
  padding: 20px;
  background: #373a3c;
  font-family: montserrat;
`;

type Props = {
  content: string
};

const Title = ({ content }: Props) => <GreyHeader>{content}</GreyHeader>;

export default Title;
