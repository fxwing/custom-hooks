import React from "react";
import styled from "styled-components";
import { useCounterContext } from "../useCounterContext";
export default function Decrease() {
  const { decrease } = useCounterContext();
  return (
    <>
      <StyledDecrease>
        <span onClick={decrease}>-</span>
      </StyledDecrease>
    </>
  );
}

const StyledDecrease = styled('div')`
  color: blue;
  padding: 10px;
`;
