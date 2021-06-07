import React from "react";
import { ContextProvider, useFeature } from "../hooks/useFeature";
// 嵌套next
function Father() {
  const { state: fatherState, dispatch: fatherDispatch } = useFeature();
  console.log(fatherState);
  return (
    <>
      <div>fatherState:{fatherState.name}</div>
      <button
        onClick={fatherDispatch.bind(null, {
          type: "default",
          payload: { name: "改变father的context" },
        })}
      >
        改变father-context
      </button>
      <ContextProvider initialState={{ name: "child" }}>
        <Child dispatch={fatherDispatch}></Child>
      </ContextProvider>
    </>
  );
}

function Child(props) {
  const { state: childState, dispatch: childDispatch } = useFeature();
  return (
    <>
      <div>childrenState:{childState.name}</div>
      <button
        onClick={childDispatch.bind(null, {
          type: "default",
          payload: { name: "改变child的context" },
        })}
      >
        改变child-context
      </button>
      <button
        onClick={props.dispatch.bind(null, {
          type: "default",
          payload: { name: "改变father的context" },
        })}
      >
        改变father-context
      </button>
    </>
  );
}

const WithContextFather = (
  <ContextProvider initialState={{ name: "father" }}>
    <Father></Father>
  </ContextProvider>
);

export default WithContextFather;
