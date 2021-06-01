import { useLayoutEffect, useRef } from "react";

/**
 *
 *  获取上个状态的值
 * @param {*} data
 * @returns data
 */
function usePrevious(data) {
  const ref = useRef(data);
  //  render后才会执行
  useLayoutEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
}

export default usePrevious;
