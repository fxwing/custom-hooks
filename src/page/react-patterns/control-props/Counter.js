import React from "react";
import styled from "styled-components";
import { CounterProvider } from "./useCounterContext";
import { Count, Increase, Decrease, Label } from "./components";

export default function Counter({
  children,
  initialValue = 0,
  onChange,
  value = null,
}) {
  const [count, setCount] = React.useState(initialValue);
  const firstMount = React.useRef(true);
  //  是否受控
  const isControl = value !== null && !!onChange;
  // 第一次不执行  更新时执行
  React.useEffect(() => {
    if (!firstMount.current && !isControl) {
      onChange && onChange(count);
    }
    firstMount.current = false;
  }, [count, onChange, isControl]);
  const handleCountChange = React.useCallback(
    (newCount) => {
      return isControl ? onChange(newCount) : setCount(newCount);
    },
    [isControl, onChange]
  );

  const currCount = React.useMemo(
    () => (isControl ? value : count),
    [count, isControl, value]
  );
  const handleIncrease = React.useCallback(
    (count = 1) => {
      handleCountChange(currCount + count);
    },
    [currCount, handleCountChange]
  );
  const handleDecrease = React.useCallback(() => {
    handleCountChange(Math.max(0, currCount - 1));
  }, [currCount, handleCountChange]);
  return (
    <div>
      <CounterProvider
        value={{
          count: currCount,
          increase: handleIncrease,
          decrease: handleDecrease,
        }}
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
