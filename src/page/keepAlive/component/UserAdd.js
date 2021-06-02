import React, { useState, useCallback } from "react";

export default function UserAdd() {
  const [count, setCount] = useState(0);
  const bindClick = useCallback(() => {
    setCount((count) => count + 1);
  }, []);
  return (
    <>
      <p>count:{count}</p>
      <button onClick={bindClick}>增加</button>
    </>
  );
}
