import React from "react";
import useDrag from "../hooks/useDrag";
export default function Position() {
  const [{ x, y }, domRef] = useDrag();
  const [{ x:x1, y:y1 }, domRef1] = useDrag();
  const defaultStyle = { height: "100px", width: "100px", background: "#000" };
  return (
    <>
      <div
        ref={domRef}
        style={{
          ...defaultStyle,
          transform: `translateX(${x}px) translateY(${y}px)`,
        }}
      ></div>

      <div
        ref={domRef1}
        style={{
          ...defaultStyle,
          transform: `translateX(${x1}px) translateY(${y1}px)`,
        }}
      ></div>
    </>
  );
}
