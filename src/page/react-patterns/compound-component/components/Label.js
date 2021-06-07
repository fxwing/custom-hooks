import React from "react";
import styled from "styled-components";
export default function Label(props) {
  const { children } = props;
  return <StyledLabel>{children}</StyledLabel>;
}

const StyledLabel = styled("div")`
  padding: 10px;
`;
