import React from "react";
import { useCounterContext } from "../useCounterContext";
import styled from "styled-components";
export default function Increase() {
  const { increase } = useCounterContext();
  return (
    <>
      <StyledIncrease>
        <span>
          <span className="context" onClick={increase.bind(null, 1)}>
            +
          </span>
        </span>
      </StyledIncrease>
    </>
  );
}

const StyledIncrease = styled.div`
  padding: 10px;
  && & > span {
    .context {
      color: green;
    }
  }
`;
