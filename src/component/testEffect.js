import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

// 更新的时候才会比较
function compareProps(prev, next) {
  if (prev.list.length === next.list.length) {
    return true;
  }
  return false; // 这个时候是更新的
}

function TestEffect(props, ref) {
  console.log("render");

  const [obj, setObj] = useState({ num: 0 });
  const [count, setCount] = useState(0);
  const childDom = useRef();
  useEffect(() => {
    // console.log("执行"); //
  }, [obj]);
  useImperativeHandle(ref, () => {
    // 传递一个dom 不用原来的ref  容易拓展
    return { bindClick, childDom: childDom.current };
  });
  const bindClick = useCallback(() => {
    setCount(count + 1);
    // setObj({ num: 0 }); //  因为创建一个新对象useEffect 会执行
    setObj(obj); // 不会执行 因为是一个对象引用
  }, [count, obj]);
  return (
    <>
      {count}
      <div ref={childDom}>子组件的节点</div>
      <button onClick={bindClick}>change count</button>
    </>
  );
}

const TestEffectWithRef = forwardRef(TestEffect);

export default memo(TestEffectWithRef, compareProps);
