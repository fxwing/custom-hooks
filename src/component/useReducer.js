import React from "react";

// useReducer惰性初始化参数   initialState来自props
//  第二个参数是第三个参数(函数的参数)
function reducer(state, { type, payload = 1 }) {
  switch (type) {
    case "+":
      return { ...state, count: state.count + payload };
    case "-":
      return { ...state, count: state.count - payload };
    case "reset":
      return initState(payload);
    default:
      break;
  }
}

function initState(initialState) {
  return { count: initialState };
}

export default function UseReducer({ count }) {
  const [state, dispatch] = React.useReducer(reducer,  count , initState);
  return (
    <div>
      {state.count}
      <button onClick={dispatch.bind(null, { type: "+", payload: 1 })}>
        +
      </button>
      <button onClick={dispatch.bind(null, { type: "-", payload: 1 })}>
        -
      </button>
      <button onClick={dispatch.bind(null, { type: "reset", payload: count })}>
        reset
      </button>
      <MemoChild dispatch={dispatch}></MemoChild>
    </div>
  );
}
function Child(props) {
  console.log("child - render");
  const { dispatch } = props;
  return (
    <>
      <div onClick={dispatch.bind(null, { type: "+", payload: 1 })}>+</div>
    </>
  );
}
const MemoChild = React.memo(Child);

UseReducer.displayName = "father";
MemoChild.displayName = "child";
