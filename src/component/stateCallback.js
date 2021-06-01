import React from "react";
import useStateCallback from "../hooks/useStatecCallback.js";

const StateCallback = () => {
  // const [count, setCount] = React.useState(0);
  const [count, setCount] = useStateCallback(0);
  const changeCount = React.useCallback(() => {
    // setCount(count + 1);
    //console.log(count);//  这个是上一次的
    setCount(count + 1, (data) => {
      console.log(data); //  这样就可以获取到最新的值
    });
  }, [count, setCount]);
  return (
    <>
      {count}
      <button onClick={changeCount}>点击</button>
    </>
  );
};

export default StateCallback;
