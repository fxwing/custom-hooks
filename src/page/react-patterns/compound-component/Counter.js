import React from "react";
import styled from "styled-components";
import { CounterProvider } from "./useCounterContext";
import { Count, Increase,Decrease,Label } from "./components";

export default function Counter({ children, initialValue = 0, onChange }) {
  const [count, setCount] = React.useState(initialValue);
  const firstMount = React.useRef(true);
  // 第一次不执行  更新时执行
  React.useEffect(() => {
    if (!firstMount.current) {
      onChange && onChange(count);
    }
    firstMount.current = false;
  }, [count, onChange]);
  const handleIncrease = React.useCallback((count = 1) => {
    setCount((prevCount) => prevCount + count);
  }, []);
  const handleDecrease = React.useCallback(() => {
    setCount((count) => Math.max(0, count - 1));
  }, []);
  return (
    <div>
      <CounterProvider
        value={{ count, increase: handleIncrease, decrease: handleDecrease }}
      >
        <StyledCounter>{children}</StyledCounter>
      </CounterProvider>
    </div>
  );
}

const StyledCounter = styled.div.attrs((props) => {
  return { justifyContent: props.justifyContent || "space-around" };
})`
  display: inline-flex;
  border: 1px solid red;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justifyContent};
  && &:hover {
    background-color: blue;
  }
`;

Counter.Count = Count;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
Counter.Label = Label;
