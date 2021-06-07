
import React, { createContext, useContext } from "react";

const CountContext = createContext();
//   提供容器
function CounterProvider(props) {
  const { children, value } = props;
  const CounterProvider = (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
  return CounterProvider;
}
// 拿到context的value
function useCounterContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCounterConext must be used within CounterProvider");
  }
  return context;
}

export { CounterProvider, useCounterContext };
