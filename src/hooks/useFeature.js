import React, { createContext, useReducer, useContext } from "react";

const Context = createContext();
function init(initialState) {
  return initialState;
}

function defaultReducer(state, actions) {
  const { type, payload = {} } = actions;
  switch (type) {
    case "default":
      return { ...state, ...payload };
    default:
      return { ...state, ...payload };
  }
}
function ContextProvider(props) {
  const {
    children,
    reducer = defaultReducer,
    initialState = {},
    ...restContextValue
  } = props;
  console.log(initialState);
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const contextValue = { state, dispatch, ...restContextValue };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

function useFeature() {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch };
}

export { ContextProvider, useFeature };
