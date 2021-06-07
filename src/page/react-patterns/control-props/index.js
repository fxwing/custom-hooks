import React from "react";
import Counter from "./Counter";
/**
 *混合
 *利用子组件和useContext  替代 props的方式
 * @export
 * @returns
 */
export default function Index() {
  const [count,setCount] = React.useState(30)
  const handleChange = React.useCallback((count) => {
    setCount(count)
  }, []);
  return (
    <>
      <Counter value={count} onChange={handleChange} initialValue={0}>
        <Counter.Label>变化数字:</Counter.Label>
        <Counter.Decrease></Counter.Decrease>
        <Counter.Count max={10}></Counter.Count>
        <Counter.Increase></Counter.Increase>
      </Counter>
    </>
  );
}
