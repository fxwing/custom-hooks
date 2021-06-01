import React, { useState } from "react";
import usePrevious from "../hooks/usePrevious";
const Previous = () => {
  const [count, setCount] = useState({name:0});
  const prevCount = usePrevious(count);
  console.log(prevCount);

  return (
    <>
      prev: {prevCount.name}
      curr:{count.name}
      <button onClick={setCount.bind(null, {name:count.name + 1})}>点击</button>
    </>
  );
};
export default Previous;
