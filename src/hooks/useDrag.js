//  拖拽hook
import { useRef, useEffect, useState } from "react";
function useDrag() {
  const initialValue = {
    currentX: 0, // 当前的X
    currentY: 0, // 当前的Y
    lastX: 0,
    lastY: 0,
  };
  const position = useRef(initialValue);
  const domRef = useRef(null);
  const [, forceUpdate] = useState([]);
  useEffect(() => {
    let startX;
    let startY;
    const start = (event) => {
      const { clientX, clientY } = event.targetTouches[0];
      console.log(clientX, clientY);
      startX = clientX;
      startY = clientY;
      domRef.current.addEventListener("touchmove", move, false);
      domRef.current.addEventListener("touchend", end, false);
    };
    const move = (event) => {
      const { clientX, clientY } = event.targetTouches[0];
      const { lastX, lastY } = position.current;
      position.current.currentX = lastX + (clientX - startX);
      position.current.currentY = lastY + (clientY - startY);
      forceUpdate([]);
    };
    const end = () => {
      // 这里event 时间中没有clientX 和cilentY数据 所以要把last上次的位置存一下
      const { currentX, currentY } = position.current;
      position.current.lastX = currentX;
      position.current.lastY = currentY;
      domRef.current.removeEventListener("touchmove", move, false);
      domRef.current.removeEventListener("touchend", end, false);
    };
    domRef.current.addEventListener("touchstart", start);
  }, []);
  const style = {
    x: position.current.currentX,
    y: position.current.currentY,
  };
  return [style, domRef];
}

export default useDrag;
