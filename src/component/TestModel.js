import React from "react";
import { ConetxtProvider, useModel } from "../hooks/models";
export default function TestModel() {
  return (
    <>
      <ConetxtProvider>
        <Child></Child>
      </ConetxtProvider>
    </>
  );
}

function Child() {
  const { state, dispatch, getLoading } = useModel();
  const loading = getLoading("global/toggle");
  console.log(state, loading);
  return (
    <>
      <p>child</p>
      <button onClick={dispatch.bind(null, "global/toggle")}>触发</button>
    </>
  );
}
