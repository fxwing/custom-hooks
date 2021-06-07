import React from "react";
import styled from "styled-components";
import { useCounterContext } from "../useCounterContext";
export default function Count(props) {
  const { max } = props;
  const { count } = useCounterContext();
  const hasError = max ? count > max : false;
  return (
    <>
      <StyledCount hasError={hasError}>{count}</StyledCount>
    </>
  );
}

const StyledCount = styled.div`
  background-color: ${({ hasError }) => (hasError ? "blue" : "red")};
  color: white;
  padding: 10px;
`;
